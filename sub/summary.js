window.__VPN_SUMMARY__ = {
  "generated_at": "2026-07-10 16:42:02",
  "subscription": {
    "name": "URAN VPN",
    "update_interval_hours": 2,
    "update_interval_seconds": 7200
  },
  "protocols": {
    "allowed": [
      "vless",
      "hysteria2"
    ]
  },
  "mihomo_nodes": {
    "all": 184,
    "normal": 170,
    "bwl": 14
  },
  "sing_box_nodes": {
    "all": 184,
    "normal": 170,
    "bwl": 14
  },
  "exit_probe": {
    "tested": 1096,
    "ok": 418,
    "normal": 326,
    "bwl": 92
  },
  "service_probe": {
    "tested": 418,
    "filter": {
      "enabled": true,
      "normal_min_ok": 1,
      "bwl_min_ok": 1,
      "before_normal": 326,
      "before_bwl": 92,
      "kept_normal": 301,
      "kept_bwl": 88,
      "dropped_normal": 25,
      "dropped_bwl": 4,
      "targets": [
        "telegram",
        "discord",
        "youtube",
        "github",
        "gemini"
      ]
    },
    "summary": {
      "normal": {
        "telegram": {
          "name": "Telegram",
          "url": "https://telegram.org/",
          "tested": 326,
          "skipped": 0,
          "ok": 281,
          "avg_ms": 1232
        },
        "discord": {
          "name": "Discord",
          "url": "https://discord.com/api/v10/gateway",
          "tested": 326,
          "skipped": 0,
          "ok": 287,
          "avg_ms": 1100
        },
        "youtube": {
          "name": "YouTube",
          "url": "https://www.youtube.com/generate_204",
          "tested": 326,
          "skipped": 0,
          "ok": 296,
          "avg_ms": 971
        },
        "github": {
          "name": "GitHub",
          "url": "https://api.github.com/zen",
          "tested": 326,
          "skipped": 0,
          "ok": 289,
          "avg_ms": 1022
        },
        "gemini": {
          "name": "Gemini",
          "url": "https://gemini.google.com/app?hl=en",
          "tested": 18,
          "skipped": 308,
          "ok": 0,
          "avg_ms": null,
          "region_ok": 14
        }
      },
      "bwl": {
        "telegram": {
          "name": "Telegram",
          "url": "https://telegram.org/",
          "tested": 92,
          "skipped": 0,
          "ok": 36,
          "avg_ms": 1417
        },
        "discord": {
          "name": "Discord",
          "url": "https://discord.com/api/v10/gateway",
          "tested": 92,
          "skipped": 0,
          "ok": 83,
          "avg_ms": 1291
        },
        "youtube": {
          "name": "YouTube",
          "url": "https://www.youtube.com/generate_204",
          "tested": 92,
          "skipped": 0,
          "ok": 84,
          "avg_ms": 1236
        },
        "github": {
          "name": "GitHub",
          "url": "https://api.github.com/zen",
          "tested": 92,
          "skipped": 0,
          "ok": 86,
          "avg_ms": 1335
        },
        "gemini": {
          "name": "Gemini",
          "url": "https://gemini.google.com/app?hl=en",
          "tested": 0,
          "skipped": 92,
          "ok": 0,
          "avg_ms": null,
          "region_ok": 0
        }
      }
    }
  },
  "dedupe": {
    "enabled": true,
    "key": "real exit_ip after sing-box probe, fallback to resolved server IP",
    "across_modes": false,
    "normal": {
      "mode": "normal",
      "before": 301,
      "after": 170,
      "dropped": 131,
      "unique_exit_ips": 170,
      "dropped_by_reason": {
        "duplicate_exit_ip:144.31.164.108": 8,
        "duplicate_exit_ip:152.89.253.147": 8,
        "duplicate_exit_ip:217.179.6.177": 8,
        "duplicate_exit_ip:167.104.216.142": 5,
        "duplicate_exit_ip:195.74.93.254": 5,
        "duplicate_exit_ip:193.39.168.51": 4,
        "duplicate_exit_ip:47.253.226.114": 4,
        "duplicate_exit_ip:91.107.146.193": 4,
        "duplicate_exit_ip:178.215.238.148": 3,
        "duplicate_exit_ip:217.179.6.115": 3,
        "duplicate_exit_ip:2a01:e5c0:6d89::2": 3,
        "duplicate_exit_ip:2a14:7583:29f8::a": 3,
        "duplicate_exit_ip:64.181.227.82": 3,
        "duplicate_exit_ip:91.107.152.188": 3,
        "duplicate_exit_ip:107.151.188.51": 2,
        "duplicate_exit_ip:130.49.161.70": 2,
        "duplicate_exit_ip:150.136.219.11": 2,
        "duplicate_exit_ip:159.89.182.67": 2,
        "duplicate_exit_ip:162.243.115.22": 2,
        "duplicate_exit_ip:165.22.7.233": 2,
        "duplicate_exit_ip:178.213.18.83": 2,
        "duplicate_exit_ip:192.3.88.48": 2,
        "duplicate_exit_ip:194.164.217.139": 2,
        "duplicate_exit_ip:2.26.49.16": 2,
        "duplicate_exit_ip:2001:41d0:701:1000::61cb": 2,
        "duplicate_exit_ip:2a01:e5c0:52ef::2": 2,
        "duplicate_exit_ip:38.244.25.17": 2,
        "duplicate_exit_ip:81.90.17.165": 2,
        "duplicate_exit_ip:104.238.129.180": 1,
        "duplicate_exit_ip:107.174.40.115": 1,
        "duplicate_exit_ip:129.213.150.222": 1,
        "duplicate_exit_ip:152.55.184.157": 1,
        "duplicate_exit_ip:159.195.22.155": 1,
        "duplicate_exit_ip:159.195.27.99": 1,
        "duplicate_exit_ip:159.195.44.159": 1,
        "duplicate_exit_ip:159.195.45.129": 1,
        "duplicate_exit_ip:159.195.46.178": 1,
        "duplicate_exit_ip:162.221.196.173": 1,
        "duplicate_exit_ip:167.104.216.177": 1,
        "duplicate_exit_ip:185.71.228.0": 1,
        "duplicate_exit_ip:186.190.211.188": 1,
        "duplicate_exit_ip:202.146.222.29": 1,
        "duplicate_exit_ip:212.124.105.20": 1,
        "duplicate_exit_ip:213.32.31.195": 1,
        "duplicate_exit_ip:23.94.123.231": 1,
        "duplicate_exit_ip:2600:1f14:317:7e00:973f:c794:70f4:2eb6": 1,
        "duplicate_exit_ip:2600:1f14:317:7e00:e70:5112:4f18:d3e5": 1,
        "duplicate_exit_ip:2600:1f16:1cdc:6900:52e0:ffa6:1598:4f4a": 1,
        "duplicate_exit_ip:2604:2dc0:200:26d6::": 1,
        "duplicate_exit_ip:2a01:4f8:1c1b:2870::1": 1,
        "duplicate_exit_ip:2a02:c207:3019:5535::1": 1,
        "duplicate_exit_ip:2a04:52c0:107:17aa::1": 1,
        "duplicate_exit_ip:2a09:bac1:7680:12e0::50b:a8": 1,
        "duplicate_exit_ip:2a0b:4140:11b9::2": 1,
        "duplicate_exit_ip:2a0b:4140:dd0f::2": 1,
        "duplicate_exit_ip:2a0e:dc0:6:8ba1::1": 1,
        "duplicate_exit_ip:31.76.251.3": 1,
        "duplicate_exit_ip:31.76.94.215": 1,
        "duplicate_exit_ip:31.77.149.71": 1,
        "duplicate_exit_ip:34.212.146.99": 1,
        "duplicate_exit_ip:43.203.135.25": 1,
        "duplicate_exit_ip:45.13.214.176": 1,
        "duplicate_exit_ip:46.17.107.183": 1,
        "duplicate_exit_ip:72.249.205.12": 1,
        "duplicate_exit_ip:91.196.32.163": 1,
        "duplicate_exit_ip:92.223.71.246": 1,
        "duplicate_exit_ip:94.183.239.27": 1
      },
      "top_locations_after": {
        "DE:FRA": 18,
        "NL:AMS": 10,
        "SG:SIN": 10,
        "DE:NUE": 8,
        "US:SCL": 8,
        "FR:PAR": 7,
        "GB:LON": 7,
        "PL:WARS": 7,
        "US:LAX": 7,
        "US:SAN": 7,
        "HK:HKG": 5,
        "RU:MOW": 4,
        "US:PDX": 4,
        "FI:HEL": 3,
        "NL:DRT": 3,
        "US:ASHB": 3,
        "US:NEW": 3,
        "US:NORT": 3,
        "DE:BER": 2,
        "DE:SAAR": 2
      }
    },
    "bwl": {
      "mode": "bwl",
      "before": 88,
      "after": 14,
      "dropped": 74,
      "unique_exit_ips": 14,
      "dropped_by_reason": {
        "duplicate_exit_ip:193.39.168.51": 27,
        "duplicate_exit_ip:178.213.18.83": 18,
        "duplicate_exit_ip:51.250.0.174": 12,
        "duplicate_exit_ip:193.168.46.180": 4,
        "duplicate_exit_ip:2a03:6f00:a::2:a128": 3,
        "duplicate_exit_ip:45.12.75.242": 3,
        "duplicate_exit_ip:5.10.250.13": 3,
        "duplicate_exit_ip:2a12:bec4:19a5:12e9::": 2,
        "duplicate_exit_ip:144.124.238.23": 1,
        "duplicate_exit_ip:5.188.140.160": 1
      },
      "top_locations_after": {
        "RU:MOW": 6,
        "RU:LED": 2,
        "CH:ZRH": 1,
        "DE:BER": 1,
        "GB:HARR": 1,
        "NL:AMS": 1,
        "RU:BOGO": 1,
        "SE:STO": 1
      }
    }
  },
  "xray_json": {
    "all": 161,
    "normal": 145,
    "bwl": 15
  },
  "gemini_nodes": {
    "enabled": true,
    "normal": 13,
    "bwl": 0,
    "probe": "Gemini generateContent API",
    "criterion": "region accepted (200 or authenticated transient API response)",
    "model": "gemini-3.5-flash",
    "key_configured": true,
    "all": 13
  },
  "public_aliases": {
    "incy-xray-all-array.json": "uran-vpn-xray-json-all.json",
    "incy-xray-normal-array.json": "uran-vpn-xray-json-normal.json",
    "incy-xray-bwl-array.json": "uran-vpn-xray-json-bwl.json",
    "xray-all.txt": "uran-vpn-xray-uri-all.txt",
    "xray-normal.txt": "uran-vpn-xray-uri-normal.txt",
    "xray-bwl.txt": "uran-vpn-xray-uri-bwl.txt",
    "mihomo-all.yaml": "uran-vpn-mihomo-all.yaml",
    "mihomo-normal.yaml": "uran-vpn-mihomo-normal.yaml",
    "mihomo-bwl.yaml": "uran-vpn-mihomo-bwl.yaml",
    "sing-box-all.json": "uran-vpn-sing-box-all.json",
    "sing-box-normal.json": "uran-vpn-sing-box-normal.json",
    "sing-box-bwl.json": "uran-vpn-sing-box-bwl.json"
  },
  "validation": {
    "ok": true,
    "failures": 0
  }
};
