# VPN-подписки

Публичная страница с готовыми подписками для Mihomo/FlClashX, sing-box и Xray-клиентов: Happ, Incy и других.

Сайт: https://uiran23.github.io/free-vpn-subscriptions/

В сборке оставлены только VLESS и Hysteria2. Публичный репозиторий хранит сайт и те подписки, которые показаны на сайте.

## Xray: 6 основных подписок

3 JSON-подписки со встроенными правилами и auto/fallback:

```text
https://uiran23.github.io/free-vpn-subscriptions/sub/incy-xray-all-array.json
https://uiran23.github.io/free-vpn-subscriptions/sub/incy-xray-normal-array.json
https://uiran23.github.io/free-vpn-subscriptions/sub/incy-xray-bwl-array.json
```

3 raw URI-подписки без JSON, просто ссылки:

```text
https://uiran23.github.io/free-vpn-subscriptions/sub/xray-all.txt
https://uiran23.github.io/free-vpn-subscriptions/sub/xray-normal.txt
https://uiran23.github.io/free-vpn-subscriptions/sub/xray-bwl.txt
```

Raw URI формат не умеет хранить rules/proxy-groups внутри подписки. В таком режиме авто-выбор делает сам клиент, если он умеет выбирать лучшую ноду из списка.

## Mihomo / FlClashX

```text
https://uiran23.github.io/free-vpn-subscriptions/sub/mihomo-all.yaml
https://uiran23.github.io/free-vpn-subscriptions/sub/mihomo-normal.yaml
https://uiran23.github.io/free-vpn-subscriptions/sub/mihomo-bwl.yaml
```

## sing-box

```text
https://uiran23.github.io/free-vpn-subscriptions/sub/sing-box-all.json
https://uiran23.github.io/free-vpn-subscriptions/sub/sing-box-normal.json
https://uiran23.github.io/free-vpn-subscriptions/sub/sing-box-bwl.json
```

Публичные ноды нестабильны и небезопасны для личных данных. Для постоянного VPN лучше свой сервер, домен и свои протоколы.
