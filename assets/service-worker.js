if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise(async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()})),a.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},a=(a,c)=>{Promise.all(a.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(a)};self.define=(a,i,d)=>{c[a]||(c[a]=Promise.resolve().then(()=>{let c={};const f={uri:location.origin+a.slice(1)};return Promise.all(i.map(a=>{switch(a){case"exports":return c;case"module":return f;default:return e(a)}})).then(e=>{const a=d(...e);return c.default||(c.default=a),c})}))}}define("./service-worker.js",["./workbox-e170c028"],(function(e){"use strict";e.setCacheNameDetails({prefix:"smart-kitchen"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:".htaccess",revision:"88e493571a271802b6dbe4f1c6bb227b"},{url:"Import Data Template.xlsx",revision:"dbb0145d219340a03cc238ff0abc2cae"},{url:"css/app.784fe0af.css",revision:"cbb6bbc5203a947d30260632ed203e14"},{url:"css/vendor.d40e81b1.css",revision:"fa1278f14110d3605bbb57df15ac8acd"},{url:"favicon.ico",revision:"222ca38565632a25a2b4505e989a3de2"},{url:"fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.1811d381.woff",revision:"84a37de85c17f186652a179b1145392f"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.fa3334fe.woff2",revision:"703cf8f274fbb265d49c6262825780e1"},{url:"icons/apple-icon-120x120.png",revision:"b1c04e7fdce3836f7a29de02b34616b4"},{url:"icons/apple-icon-152x152.png",revision:"10dda70efd84a738459ebc492aacfa6f"},{url:"icons/apple-icon-167x167.png",revision:"49c0c38337e734453a0ed5bfac93bef4"},{url:"icons/apple-icon-180x180.png",revision:"908fb6afb20a7755148acd3791a154a8"},{url:"icons/apple-launch-1125x2436.png",revision:"931e4ba5c9136fdfa1748d0779d2f4af"},{url:"icons/apple-launch-1242x2208.png",revision:"042d109942bf71ccea64e5384e18e911"},{url:"icons/apple-launch-1242x2688.png",revision:"4f2118f77550bfe696446bfc64946238"},{url:"icons/apple-launch-1536x2048.png",revision:"315aeb0d9a3946d86ef20e22f4aff9f3"},{url:"icons/apple-launch-1668x2224.png",revision:"67b9129219bc4508bbad7de5e68ba219"},{url:"icons/apple-launch-1668x2388.png",revision:"8773c3a09f34506b916d5107f2e5d56b"},{url:"icons/apple-launch-2048x2732.png",revision:"4008905103cba777b0b4f32426dffcf7"},{url:"icons/apple-launch-640x1136.png",revision:"5ce2523c8d969612593f765de8d97ad3"},{url:"icons/apple-launch-750x1334.png",revision:"9875d857bf360d69ad587a16963d8d5b"},{url:"icons/apple-launch-828x1792.png",revision:"fb4a056b885f3e6ac0d4dace4cf841ab"},{url:"icons/favicon-128x128.png",revision:"ddfea4cf7688b37e2944465fd6ae0310"},{url:"icons/favicon-16x16.png",revision:"c1d266da74bc1aa297bb5599845fc1d6"},{url:"icons/favicon-32x32.png",revision:"ee8809fcee4d94e002f774875d963261"},{url:"icons/favicon-96x96.png",revision:"fce11f3d52707044eb4d2f13f3f7d972"},{url:"icons/icon-128x128.png",revision:"ddfea4cf7688b37e2944465fd6ae0310"},{url:"icons/icon-192x192.png",revision:"9ae3d24ab6f22f919b9d508d83601f1a"},{url:"icons/icon-256x256.png",revision:"74110e049645c967cee25c27cdff80fd"},{url:"icons/icon-384x384.png",revision:"2bfc09cf6b9207b452818bfa18fb11b2"},{url:"icons/icon-512x512.png",revision:"4af76e191773e12001c962f01bed57d0"},{url:"icons/ms-icon-144x144.png",revision:"9fba23d73985e6e2e5c41f9e27823567"},{url:"icons/safari-pinned-tab.svg",revision:"37f2a7b7c2941a2ca5a73af62b530543"},{url:"index.html",revision:"a88bb8c047c06952708bf1ee006de4dd"},{url:"index.php",revision:"4dc6159a27f3d64502feca19675b6e16"},{url:"js/10.4cb199f9.js",revision:"55acf5dd207a7d688b36e1759808053c"},{url:"js/100.58b8f7f0.js",revision:"b407376fc227fe87e256e4949efa2260"},{url:"js/101.e427a427.js",revision:"585b8c21b33c66b81f185e7f28a90535"},{url:"js/102.899c2f17.js",revision:"5a6862ab0a312e6a4924683fcd8207cf"},{url:"js/103.3800fdd2.js",revision:"cabbdd2fb22e1df90f815417efd1f45e"},{url:"js/11.65e12982.js",revision:"071bf608cfda0892e57697f0dff7eeba"},{url:"js/12.daadc89d.js",revision:"321e3675b8e20ab0e3f2e085b6f3db75"},{url:"js/13.cad9d7c6.js",revision:"87cc4970f8f402210378c61e0ef1b9fa"},{url:"js/14.5be0d6f6.js",revision:"4702a672a6c6696f3cc88371c8a4a29c"},{url:"js/15.37a1be9d.js",revision:"3e59fdf0c49a8f811fe11693d418e248"},{url:"js/16.4fd35c5a.js",revision:"9afd1b457379194521aff3255c8288ed"},{url:"js/17.52256e52.js",revision:"0ecfd4709093fa43feb2b97c366decaa"},{url:"js/18.6c4ba988.js",revision:"bc141c49b7bc783affbc6f56af4d3b36"},{url:"js/19.4702896b.js",revision:"33dc81de608a03291299c83f9ab1bff7"},{url:"js/20.60cd076b.js",revision:"6f2d1c89510cb26e639a5ba131f0ed2a"},{url:"js/21.087f9275.js",revision:"ce7abc078eb5b63032a0f18cee75c91c"},{url:"js/22.63d310ba.js",revision:"e71e8f5555703a1e49b714169d02afb0"},{url:"js/23.cabc7830.js",revision:"e0352256806d51af2530e61ef1db4766"},{url:"js/24.04ca04db.js",revision:"be482534f97a9a9612bd79d924afeacd"},{url:"js/25.d0015c79.js",revision:"3ec81b3b26ecbb1b869b1810bc5f9736"},{url:"js/26.012050d1.js",revision:"90e904879cf14f06e2de2b3e99306a83"},{url:"js/27.7579c617.js",revision:"e07dd5d9fe31c45aef45543a3034b88a"},{url:"js/28.192bf2f1.js",revision:"13e7372fc4281e0243cc16019b8ca8d6"},{url:"js/29.07d0d303.js",revision:"e1ac502353fa3dd5b5181b230f56bb9b"},{url:"js/3.8040804f.js",revision:"6bde59b3a61f513c7c5b9391e9cce395"},{url:"js/30.07f6b690.js",revision:"95d6f2fb29856efd225c442b5864870b"},{url:"js/31.dfa19fc8.js",revision:"fcafcfa8f666f8f521783f52bba7758b"},{url:"js/32.1b06d3f1.js",revision:"cdc2cfedc10cb79e43ef412e3c48e915"},{url:"js/33.b857fbd9.js",revision:"719ace4158a609f0d69aa6d01f0102ee"},{url:"js/34.f1171907.js",revision:"573bfa4ac5f7e603a2877429d5068e1b"},{url:"js/35.d96dafb9.js",revision:"f400ca36326a12cfe537def7627db412"},{url:"js/36.949e8c8b.js",revision:"7a8ea1f385aa2020c4ac1ace61234f46"},{url:"js/37.66b9de61.js",revision:"43fad30a5bec916092917becdb3d075b"},{url:"js/38.4765b722.js",revision:"88cce79878bb585060010f2c89942d97"},{url:"js/39.9b8da81e.js",revision:"bd7662fa3b7236179eff52220c414236"},{url:"js/4.c20b74e2.js",revision:"6cd4c50220fcd0425a5a4b45791bd0b2"},{url:"js/40.22980c77.js",revision:"3ddabca6bf422be04643d5a4f238e07e"},{url:"js/41.96761ebd.js",revision:"4ae196f619649b332ce24dae809d414b"},{url:"js/42.16d6cfa7.js",revision:"66d8ca890733d27e62393e91a0d3d09a"},{url:"js/43.c3c92248.js",revision:"5d61d32678472eaff2b3d6a71f7d6c83"},{url:"js/44.c8a590b2.js",revision:"23684c36767dd52074c629458bf94903"},{url:"js/45.7506e751.js",revision:"6b3c5247a4a6000d57861e8045452b86"},{url:"js/46.0b9bcbf7.js",revision:"76d9c79385d4e2800763a578672b6157"},{url:"js/47.8ed9ebf2.js",revision:"2c72966e57cca0301f4f4a9b77f6a0c7"},{url:"js/48.c0d630aa.js",revision:"cfb77b8fb1af7910e5cd0a54bce47a0d"},{url:"js/49.141055d9.js",revision:"52e606da827353d58ea35db79fcc85ee"},{url:"js/5.1c89dd9e.js",revision:"4aadf177fe7ef774658299fdbb20e200"},{url:"js/50.52d893a7.js",revision:"08f60d1a7ce699cccc8c10609344d8e4"},{url:"js/51.bba9abfe.js",revision:"12ff99491abf0f64726094acc2244083"},{url:"js/52.b93193f0.js",revision:"4eba6f97d4c48b3612693df57cd671c7"},{url:"js/53.2e57a6f7.js",revision:"7057f8067d24811165c4e37deb6a512d"},{url:"js/54.7ffb4209.js",revision:"5841347ccbdf607abcb10adfa4c86895"},{url:"js/55.d534d971.js",revision:"e0f2c0a555cd07ecf091f54e251d150b"},{url:"js/56.074e8838.js",revision:"94deb63ee62902d20276c98d0dbac5e4"},{url:"js/57.1ccc654e.js",revision:"8d6b8c7d8ac2c112ed5e76b3759135ad"},{url:"js/58.e4c1eda6.js",revision:"5fc8404111cae4eaad70a0550db333c9"},{url:"js/59.47d84043.js",revision:"0bd18cc936a6dac828d3ca75be09bf49"},{url:"js/6.f5726e0c.js",revision:"85f3b16c22cd29bcd1c84b329a959f1c"},{url:"js/60.123434bc.js",revision:"55abdd46e038cf68acba2db6576c17df"},{url:"js/61.682c755e.js",revision:"3da31a238ca40337da6f52a3e662c1fe"},{url:"js/62.f59f222f.js",revision:"1e08b9314b97ecd1227ebde840622022"},{url:"js/63.f0ff5d75.js",revision:"77ce74fdcd9de5212132595249426682"},{url:"js/64.41bbd8b6.js",revision:"6ca86555877be334e4da27bb25408948"},{url:"js/65.c0f9fecd.js",revision:"2935d2f3e58d473ff247a75d2c8e5512"},{url:"js/66.330ba6da.js",revision:"014bdda4e99966079fc81d643041b503"},{url:"js/67.21861a04.js",revision:"f460bbdfcb2fae3bcd06b86d4ceea418"},{url:"js/68.d5bc0fb4.js",revision:"145614a7b9d556cf002caa6ababadee5"},{url:"js/69.ee00983a.js",revision:"0d0bc50ccc216dcc67a8c45dcbf6b4d0"},{url:"js/7.5cc3ff8f.js",revision:"e0f3d2239f0897078eb3f998bcf3108e"},{url:"js/70.b845b98c.js",revision:"d3e70e0eaebce2b99d5455bb73a444e1"},{url:"js/71.2f43343d.js",revision:"b92b9c94ca3a9803ade646c9864eabcd"},{url:"js/72.e0682a75.js",revision:"473f65d103b5fa608aa4a3758cb66e7e"},{url:"js/73.22c5e8d4.js",revision:"384ea4048382d7f2382a2afae60718b5"},{url:"js/74.24e9167d.js",revision:"541fc55c2b5eaa203d040434020f36fc"},{url:"js/75.51840660.js",revision:"604deb4899f796f30dcd16ad1c8b74b9"},{url:"js/76.c7d399d9.js",revision:"b3017c342718c472cd20c34d886e5968"},{url:"js/77.7637969f.js",revision:"856f1d98b57a5e191447edfebd13f4fa"},{url:"js/78.e1920763.js",revision:"6e07435e326ca4f8a88407d70575c1a9"},{url:"js/79.fc98e124.js",revision:"67b1c1ab8f7794e8e10338d519954851"},{url:"js/8.f47639b7.js",revision:"dcc6ca21eaa8cc09b7e560a975edaefb"},{url:"js/80.5c65d652.js",revision:"e043bba72b4f93ef85f60bc7943cbe74"},{url:"js/81.a8ec0178.js",revision:"8432475393f98abe513b12ea59233c02"},{url:"js/82.04bd05ff.js",revision:"21af08e35c192da8b5ab08d9c96a53d5"},{url:"js/83.c4b119bb.js",revision:"77e9b585f1eaa5d283fcc38b7ba2eb08"},{url:"js/84.20a88054.js",revision:"116cba6d451e4d3a2a20fff90c5104e5"},{url:"js/85.2570e71a.js",revision:"78ac8a9e0cc922bc3244b28f0838f3c9"},{url:"js/86.9ccbcbd2.js",revision:"0ccb91397a60d9b05af409ff0dd2bdff"},{url:"js/87.15068a86.js",revision:"dd0ca2ee9646145592789570afd1fa40"},{url:"js/88.eca278e3.js",revision:"b14ff35c726e5f2573a082b0b53e42f9"},{url:"js/89.8b529009.js",revision:"6c9c1625023c9dcc19a4b1b82954f117"},{url:"js/9.5f7abbee.js",revision:"c03c505293b1099427f422736428643d"},{url:"js/90.712baa5b.js",revision:"bd3ce349a95e17066ea2b6a9ab013958"},{url:"js/91.957a6504.js",revision:"30d21066d6036005d4282374270b4360"},{url:"js/92.403a082a.js",revision:"1c8606a16a509a1a81dfec1d94849eed"},{url:"js/93.a762da35.js",revision:"b9fdd7dfa402264976f1a11f513f189a"},{url:"js/94.c9166e6f.js",revision:"3e9a05151ecac0948f796665515ca022"},{url:"js/95.2f736928.js",revision:"079fe5ca669d85e302f283f1cfb4c4e8"},{url:"js/96.2bdab36d.js",revision:"1621ed6a050a90ed889c2caf435c153f"},{url:"js/97.4856d5bd.js",revision:"00c261bac5787dd36af55efef47d3c56"},{url:"js/98.53d02f8b.js",revision:"6b367784f40bb8e125caa7f97a524d69"},{url:"js/99.5ef2f895.js",revision:"ec433640aeb2ea1faae8a171a7f719c4"},{url:"js/app.f93820b2.js",revision:"16be22bbabe171a02af521d7c2be877f"},{url:"js/chunk-common.ae6d7787.js",revision:"1c775de08f52603627d613aef4b76306"},{url:"js/vendor.0ccfe876.js",revision:"a4966270933e276039c4a95f6190ec39"},{url:"manifest.json",revision:"22c8cb514c8514731047056824b2bb26"},{url:"media/1/4DGZFCwVDIIv5vm7yBdj8r65kv9qKU0N5kEU2OiV.jpeg",revision:"42908e1fd04989a0238cf2771b1e7ba7"},{url:"media/1/image_2021-09-17_114304.png",revision:"1b0254e8af17695022a90a3013f2d53f"},{url:"media/10/logo2.png",revision:"9c1802311a41ccd73517c0eee25521b9"},{url:"media/13/image-404.jpg",revision:"405046a37c3aca601f7e57b217f33d2a"},{url:"media/14/14584619.jpg",revision:"f428823131e69ee23847f7dd757bc67c"},{url:"media/15/logo-mobile.png",revision:"a5a64a33f3f450e4fb5bbf7f6853d04b"},{url:"media/2/A1QKqn1Wv4kyHNeocAAmPfBmm9ZAkff8SbpeKLtY.jpeg",revision:"68290fa8ab155ed1543f556593ecc2a1"},{url:"media/2/logo.png",revision:"0eafbfc3e1babd9e31b8fed6b525e9cd"},{url:"media/21/16023214373_90552b64f6_o.jpg",revision:"cbdb645d74ebd4abc7d83eac5547c4ef"},{url:"media/22/Chappathi.jpg",revision:"fa95d7560884bf6176508e98861c88fe"},{url:"media/24/lts-tablesdining.jpg",revision:"ff6d0aebedef41f5a026fa7c498d5dc2"},{url:"media/25/Fast-Food-Tables-and-Chairs-Kfc-Restaurant-Tables-and-Chairs-Mcdonald-s-Restaurants-with-Table-and-Chairs-Dining-Table-and-Chairs.jpg",revision:"95fd0999b3002de015d50b7f08551c4b"},{url:"media/26/outdoor-table-let-500x500.jpeg",revision:"91f898021bc8213cbe53d5fd550f1d31"},{url:"media/27/s-l400.jpg",revision:"c9c940a3c8d45451ed6d6fc3a50e42ab"},{url:"media/28/Restaurants-Tables.jpg",revision:"4e900c77b8ecd3c3b34c3a2ca9b6c45f"},{url:"media/3/exywL0KdKipRCSuAuZJcsQLc3zViA0O7Vk9MNPJc.jpeg",revision:"ad10514942722e864187db48eb2bc13a"},{url:"media/33/modern.jpg",revision:"85d4632ece095ea30721764ea781979d"},{url:"media/34/1.jpg",revision:"1f9edd0021c9854ae3d1c6c2433cccb6"},{url:"media/37/pp.jpg",revision:"4b599b3373caa64c7c99636e6e7d59c4"},{url:"media/38/68562297.jpg",revision:"3f1a2f09ac3e8b48d5fe26f7f2ae6ee1"},{url:"media/39/14584619.jpg",revision:"f428823131e69ee23847f7dd757bc67c"},{url:"media/40/kitchen.jpg",revision:"29ce9b0954f6d5edc42c02ebcb4a5a72"},{url:"media/41/hotel-rama-krishna.jpg",revision:"d8fe9b5dc98f04137ef1e70489b4c59d"},{url:"media/42/16023214373_90552b64f6_o.jpg",revision:"cbdb645d74ebd4abc7d83eac5547c4ef"},{url:"media/43/getlstd-property-photo.jpg",revision:"a9d79d919097f6ad4d6d13a7e827235b"},{url:"media/44/extravagant-meal.jpg",revision:"752c22fc050b3e1f1ae842dc2e283724"},{url:"media/45/pathiri.jpg",revision:"64a9c849e5ba181a4b1062f9510b0164"},{url:"media/46/68562297.jpg",revision:"3f1a2f09ac3e8b48d5fe26f7f2ae6ee1"},{url:"media/5/WD2OKbKsSeWA9h6h2Ozb93445EpnUu1EwSXyB0EB.jpeg",revision:"069cae5a79e9d7c6cdac2c3af46fb3e1"},{url:"media/6/logo2.png",revision:"9c1802311a41ccd73517c0eee25521b9"},{url:"media/6/pp.jpg",revision:"b590ce20adc907ea0aae610ea5af8ba3"},{url:"media/7/free-dotted-uae-map-vector.png",revision:"7ea3e259a0227f569ab1a0b5da64f1d4"},{url:"media/7/pp.jpg",revision:"4b599b3373caa64c7c99636e6e7d59c4"},{url:"media/8/14584619.jpg",revision:"f428823131e69ee23847f7dd757bc67c"},{url:"media/9/logo2.png",revision:"9c1802311a41ccd73517c0eee25521b9"},{url:"media/attention.mp3",revision:"d275364deff195599bedc9eb39b8fabe"},{url:"media/customer.jpg",revision:"8a652ac30c99ab0a48f412efb26513ba"},{url:"media/homedelivery.jpg",revision:"3280f1fe80ea6d1487f8f6bd2f0defd9"},{url:"media/item.jpg",revision:"1a1c28f4dc2e5829d70cba5461bd1afd"},{url:"media/kitchen.jpg",revision:"fb1f42d2f7d44657c4d3d06de9353425"},{url:"media/no-image.jpg",revision:"8d32e0fe0868e97e7d5283d6d3e753e3"},{url:"media/remote.jpg",revision:"edf231f41e5dd56c38b759b65d09184c"},{url:"media/sale.jpg",revision:"a8eebfcae40cf9d2d36f2336e07956d7"},{url:"media/seating.jpg",revision:"2501974ca0f8b5df7fc1914689f6e70a"},{url:"media/takeaway.jpg",revision:"6cbb7daaba47d341017fe8a923e4ea52"},{url:"media/tap.mp3",revision:"37ae84f703f84b7a53813554f6405ffa"},{url:"media/user.jpg",revision:"41f5696367000cc71e12f5d54de4621b"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"web.config",revision:"df72170f1cdffd64352bb4dafbd6efa0"},{url:"~$Import Data Template.xlsx",revision:"db8ee23edb85db5d94cdf6fc5c0a1104"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
