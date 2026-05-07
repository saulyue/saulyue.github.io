# L1: 基建层 — 服务器还原手册

> 目标：拿到一台全新服务器后，按此文档还原完整环境

## 前置条件

| 项 | 要求 |
|----|------|
| OS | Debian 12+ / Ubuntu 22+ |
| 配置 | 2C/2G 起步 |
| 域名 | 已购买，DNS 可控 |
| SSH | 本机公钥已注入服务器 |

## Step 1: 基础软件

```bash
apt update && apt install -y curl git nginx certbot python3-certbot-nginx

# Docker
apt install -y docker.io
# 或者（如果 apt 源没有）：curl -fsSL https://get.docker.com | sh

systemctl enable docker nginx
```

## Step 2: Docker 镜像加速（国内服务器必须）

```bash
mkdir -p /etc/docker
cat > /etc/docker/daemon.json << 'EOF'
{
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://docker.xuanyuan.me"
  ]
}
EOF
systemctl restart docker
```

## Step 3: 克隆项目

```bash
mkdir -p /data
cd /data
git clone https://github.com/saulyue/saulyue.github.io.git saulyue-hub
```

## Step 4: 构建启动

```bash
cd /data/saulyue-hub
docker compose up -d --build
# 验证
curl localhost:3000/api/health
# 期望: {"status":"ok",...}
```

## Step 5: Nginx 反代

```bash
cat > /etc/nginx/sites-available/saulyue.conf << 'EOF'
server {
    listen 80;
    server_name saulyue.site www.saulyue.site blog.saulyue.site api.saulyue.site;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
EOF

ln -sf /etc/nginx/sites-available/saulyue.conf /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

## Step 6: DNS 解析

在 DNSPod / Cloudflare 添加：

| 类型 | 主机记录 | 值 |
|------|---------|-----|
| A | `@` | `<服务器IP>` |
| A | `*` | `<服务器IP>` |

## Step 7: HTTPS 证书

```bash
certbot --nginx \
  -d saulyue.site \
  -d www.saulyue.site \
  --non-interactive --agree-tos --email saulyue@qq.com --redirect

# 自动续签已由 certbot.timer 处理
systemctl enable certbot.timer
```

## Step 8: CI/CD（GitHub Actions）

GitHub 仓库 → Settings → Secrets and variables → Actions → New repository secret:
- Name: `SSH_PRIVATE_KEY`
- Value: 本机 `~/.ssh/id_rsa` 私钥内容

## 验证清单

```bash
curl -sI https://saulyue.site | head -3
# 期望: HTTP/1.1 200 OK

curl https://saulyue.site/api/health
# 期望: {"status":"ok",...}
```

---

## 当前服务器信息

| 项 | 值 |
|----|-----|
| SSH 别名 | `ntc` |
| IP | 146.56.250.72 |
| OS | Debian 13 (trixie) |
| Docker | 26.1.5 |
| Nginx | 1.26.3 |
| 项目路径 | `/data/saulyue-hub` |
| 证书路径 | `/etc/letsencrypt/live/saulyue.site/` |
| 证书到期 | 2026-08-05（自动续签） |
