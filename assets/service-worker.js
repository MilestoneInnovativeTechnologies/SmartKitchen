if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return d[e]||(a=new Promise(async a=>{if("document"in self){const d=document.createElement("script");d.src=e,document.head.appendChild(d),d.onload=a}else importScripts(e),a()})),a.then(()=>{if(!d[e])throw new Error(`Module ${e} didn’t register its module`);return d[e]})},a=(a,d)=>{Promise.all(a.map(e)).then(e=>d(1===e.length?e[0]:e))},d={require:Promise.resolve(a)};self.define=(a,i,c)=>{d[a]||(d[a]=Promise.resolve().then(()=>{let d={};const f={uri:location.origin+a.slice(1)};return Promise.all(i.map(a=>{switch(a){case"exports":return d;case"module":return f;default:return e(a)}})).then(e=>{const a=c(...e);return d.default||(d.default=a),d})}))}}define("./service-worker.js",["./workbox-e170c028"],(function(e){"use strict";e.setCacheNameDetails({prefix:"smart-kitchen"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:".htaccess",revision:"88e493571a271802b6dbe4f1c6bb227b"},{url:"Import Data Template.xlsx",revision:"dbb0145d219340a03cc238ff0abc2cae"},{url:"css/app.784fe0af.css",revision:"cbb6bbc5203a947d30260632ed203e14"},{url:"css/vendor.d40e81b1.css",revision:"fa1278f14110d3605bbb57df15ac8acd"},{url:"favicon.ico",revision:"222ca38565632a25a2b4505e989a3de2"},{url:"fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.1811d381.woff",revision:"84a37de85c17f186652a179b1145392f"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.fa3334fe.woff2",revision:"703cf8f274fbb265d49c6262825780e1"},{url:"icons/apple-icon-120x120.png",revision:"b1c04e7fdce3836f7a29de02b34616b4"},{url:"icons/apple-icon-152x152.png",revision:"10dda70efd84a738459ebc492aacfa6f"},{url:"icons/apple-icon-167x167.png",revision:"49c0c38337e734453a0ed5bfac93bef4"},{url:"icons/apple-icon-180x180.png",revision:"908fb6afb20a7755148acd3791a154a8"},{url:"icons/apple-launch-1125x2436.png",revision:"931e4ba5c9136fdfa1748d0779d2f4af"},{url:"icons/apple-launch-1242x2208.png",revision:"042d109942bf71ccea64e5384e18e911"},{url:"icons/apple-launch-1242x2688.png",revision:"4f2118f77550bfe696446bfc64946238"},{url:"icons/apple-launch-1536x2048.png",revision:"315aeb0d9a3946d86ef20e22f4aff9f3"},{url:"icons/apple-launch-1668x2224.png",revision:"67b9129219bc4508bbad7de5e68ba219"},{url:"icons/apple-launch-1668x2388.png",revision:"8773c3a09f34506b916d5107f2e5d56b"},{url:"icons/apple-launch-2048x2732.png",revision:"4008905103cba777b0b4f32426dffcf7"},{url:"icons/apple-launch-640x1136.png",revision:"5ce2523c8d969612593f765de8d97ad3"},{url:"icons/apple-launch-750x1334.png",revision:"9875d857bf360d69ad587a16963d8d5b"},{url:"icons/apple-launch-828x1792.png",revision:"fb4a056b885f3e6ac0d4dace4cf841ab"},{url:"icons/favicon-128x128.png",revision:"ddfea4cf7688b37e2944465fd6ae0310"},{url:"icons/favicon-16x16.png",revision:"c1d266da74bc1aa297bb5599845fc1d6"},{url:"icons/favicon-32x32.png",revision:"ee8809fcee4d94e002f774875d963261"},{url:"icons/favicon-96x96.png",revision:"fce11f3d52707044eb4d2f13f3f7d972"},{url:"icons/icon-128x128.png",revision:"ddfea4cf7688b37e2944465fd6ae0310"},{url:"icons/icon-192x192.png",revision:"9ae3d24ab6f22f919b9d508d83601f1a"},{url:"icons/icon-256x256.png",revision:"74110e049645c967cee25c27cdff80fd"},{url:"icons/icon-384x384.png",revision:"2bfc09cf6b9207b452818bfa18fb11b2"},{url:"icons/icon-512x512.png",revision:"4af76e191773e12001c962f01bed57d0"},{url:"icons/ms-icon-144x144.png",revision:"9fba23d73985e6e2e5c41f9e27823567"},{url:"icons/safari-pinned-tab.svg",revision:"37f2a7b7c2941a2ca5a73af62b530543"},{url:"index.html",revision:"e900df0ef3784a2058d7fcaf954d3d7c"},{url:"index.php",revision:"4dc6159a27f3d64502feca19675b6e16"},{url:"js/10.7fa87b37.js",revision:"09fffe15e9eb6dd5f5a09087e4e69ade"},{url:"js/11.ca662bc7.js",revision:"588b0e3c3dda2557bf2da06653f592e2"},{url:"js/12.9d17c228.js",revision:"4ab3c6fa74865f55691287fa1e3d0d2e"},{url:"js/13.3244d4ef.js",revision:"f8feb85488e73897639daeaaa1229679"},{url:"js/14.65d391d4.js",revision:"6b5f003a3b7bdac8f236e980647157d5"},{url:"js/15.a81d0a02.js",revision:"320d434c09902907e643ddf1205d0d14"},{url:"js/16.27818e00.js",revision:"6118efdf64760d399f272f6a8ee78fc7"},{url:"js/17.b90bf2a1.js",revision:"2bcffb7cc37dd721ac7918aac9b8c7b9"},{url:"js/18.ae23ce2f.js",revision:"514ce579f8b75754ceb0ecc5a32dd737"},{url:"js/19.b7adf6a2.js",revision:"9c01425ea050c1795fe6cc251baf5321"},{url:"js/20.4a589f28.js",revision:"39a5d5f3bc806067f4aaabdc432a7a22"},{url:"js/21.ab9598da.js",revision:"bed0c90715b6c637d5969204263e9774"},{url:"js/22.5b3a7ef9.js",revision:"5efa49c72fc72c939fd0f1b0f097535f"},{url:"js/23.8298bf5d.js",revision:"e7aa75307d53786d695512d34c1a54c8"},{url:"js/24.2792e7bc.js",revision:"13ebe47e6abf4f5191b189376c242579"},{url:"js/25.cf26a3af.js",revision:"245ab2829e271ebb1f13b5aad1a89178"},{url:"js/26.1c01c2b1.js",revision:"d4910217b44be726952adab942fbc66d"},{url:"js/27.b07ac907.js",revision:"f2d6d40008917196a38f84dbbf46cefc"},{url:"js/28.acd76a62.js",revision:"55c05bff08193aff5e89790faf940b18"},{url:"js/29.36f14c19.js",revision:"c8efcc2e7b10fd09b624811cdf7cd697"},{url:"js/3.6cbfe0c2.js",revision:"9ef036ae5bd0912ce261d4d82d9629a1"},{url:"js/30.756f02bc.js",revision:"a0442f9fdb7a1cd0464bd12d3ca3aae4"},{url:"js/31.903d0c9b.js",revision:"15c409cbdc6b0e2c39f699e55375e092"},{url:"js/32.f28ba7df.js",revision:"066777c8527a05949d436895c4f635b5"},{url:"js/33.5adb622d.js",revision:"f11e5604da105fb4a115b9ce9444070c"},{url:"js/34.154b044c.js",revision:"a2424e0c2df87b2424fde3ee4cab4bdb"},{url:"js/35.95f98c6d.js",revision:"a496975cb967ea630c3bf8dac6d28d20"},{url:"js/36.c1b4c7f6.js",revision:"c16f2e4a5422bff3361a53c9d13a8e86"},{url:"js/37.3b0c139a.js",revision:"7795af22826c7e99da28d7276fa42b8d"},{url:"js/38.be0abfe0.js",revision:"60f7185a5c0e227c7c30a54af075cda6"},{url:"js/39.e95d71e0.js",revision:"8b8490fcfb825a3b78d3281b8e5bf4ee"},{url:"js/4.adabf1ec.js",revision:"2d134ac63b8a6408d1ab2b4de29d3ab1"},{url:"js/40.52f420df.js",revision:"0a886dae93c4e9766011c55f9b24d7ad"},{url:"js/41.1b1cea9a.js",revision:"55c9c687a4e129ccc4d99b604b4567dd"},{url:"js/42.ac661d3a.js",revision:"d7122bc93eb0917fa043fc35adeec32e"},{url:"js/43.fec11dd9.js",revision:"553ba37cc9c41d6687a79de860766178"},{url:"js/44.96dd650c.js",revision:"f6eeb32494fa9058b4147768d59550f9"},{url:"js/45.d96e9bef.js",revision:"6b2db13bdc6ca447b863f0bded2b58fe"},{url:"js/46.63efdc61.js",revision:"699e0911feb5bbb410824fba9a460868"},{url:"js/47.e973def3.js",revision:"bb115edc3a2eaef758adfbec1bd70e5a"},{url:"js/48.f683344f.js",revision:"29a9be0d0788e7d9bcb8a400827ed3f1"},{url:"js/49.3bcfad5b.js",revision:"3f5704ad4810017fd1ce99f5ba344f6b"},{url:"js/5.b4345d64.js",revision:"801c733f78c113a2da0c8ea235bdea32"},{url:"js/50.8767e6a2.js",revision:"21976a24a30fc916073c84899fc5e742"},{url:"js/51.c09a2521.js",revision:"ee187b93aaa6f4700241479752006ef9"},{url:"js/52.e9f85e7b.js",revision:"a73c4acd7d6753cddca89feb0f0ddd32"},{url:"js/53.ae00087d.js",revision:"29a42fd8384990d9aebe5b68d57fb52a"},{url:"js/54.eaf99b02.js",revision:"97f63b41a8a6d4b8dfe50b5e8d1bc265"},{url:"js/55.adcde323.js",revision:"66a63c314cd3c96bb9795db2ab9ebe45"},{url:"js/56.ba2d28ca.js",revision:"b86be10b52fe45bb01c0e2cd44cdc7b3"},{url:"js/57.a2174ea2.js",revision:"cb45366eda93fbf0d5682d20d71f4ff5"},{url:"js/58.f19d24bc.js",revision:"a13ff34f5f12532993dd134ac4e9eb71"},{url:"js/59.b266f2cd.js",revision:"7cefeb297592c4a200353535118fcded"},{url:"js/6.135c88db.js",revision:"80ea79ac31d07782c11bd803d3f8c53c"},{url:"js/60.8249ad7d.js",revision:"a05ff0efbbe3c3bb3571fe5a0abe0a7d"},{url:"js/61.1645ce01.js",revision:"17332fa99304375a310b9e8881e2bf87"},{url:"js/62.bbe943ff.js",revision:"ff83f777318f714e335d602c9ba319a3"},{url:"js/63.067a6cd4.js",revision:"09ef9606cb87cd510b51a5ff0ce5908d"},{url:"js/64.6eb17cdd.js",revision:"213be6ced727f5707350be0a7a81e4b6"},{url:"js/65.6eeaf358.js",revision:"90d28d19e3ffb355e5578d4290f6f76c"},{url:"js/66.a6260b76.js",revision:"8c9f2ce57ca5140046b4bbd541ab2cc4"},{url:"js/67.c5ccf89e.js",revision:"38150705f95fac410b2d5e3a6b1d5c0c"},{url:"js/68.f75f1df5.js",revision:"bd7449ee08655b53ef28a1ecd6b6eff7"},{url:"js/69.251b65c5.js",revision:"962fc27d95a638b8b8546e578a96a4c6"},{url:"js/7.e003370f.js",revision:"2d66a1ccc32f3880a24f308fd1e77543"},{url:"js/70.48a9905f.js",revision:"9de1d4adc1fee10386f33389669c2d41"},{url:"js/71.5d650464.js",revision:"ae0ffba5de6a30681ee5555171f6efe1"},{url:"js/72.0a74573f.js",revision:"6e96785735164f3655295c9978cda7e6"},{url:"js/73.b8c5fcb7.js",revision:"406600d117ad736f8dcbe97ec7199e80"},{url:"js/74.2bbee019.js",revision:"b10b93a70f1b8d9d0ee0984104e93c71"},{url:"js/75.0c61d867.js",revision:"f235845f3c9f6e12de34371ac99b1c50"},{url:"js/76.513ac228.js",revision:"492cf943ac4582769750db7414358f85"},{url:"js/77.6d1df5a8.js",revision:"2a0ddb8846ca2a0a449f320943532ffa"},{url:"js/78.fd84fae6.js",revision:"c5e19ca56398c904040ea7ed254c451c"},{url:"js/79.b6aeabc8.js",revision:"09f1ff3da5573f72b636b2d8b7a1a0d1"},{url:"js/8.88e11b6c.js",revision:"e80fb9cf867952f208506717d6fa9d0f"},{url:"js/80.67237a14.js",revision:"aa86e72b3bda7a8a2edb7040783fe83d"},{url:"js/81.b929edb7.js",revision:"f8172df580622fb11f6f85c3a59db3b2"},{url:"js/82.763ee4ab.js",revision:"6cef4c70fb0280e05a07440da3a74bb8"},{url:"js/83.0237a4e3.js",revision:"a1bf73a3fbd56396f2e9efac5869d76a"},{url:"js/84.2820846c.js",revision:"a22c8556c424ce27d40f1d9b5675d161"},{url:"js/85.02b5222a.js",revision:"7a20cd82a028b814f71c3200e39f574f"},{url:"js/86.8a9f55f7.js",revision:"0766476c2ae3fff349ab9f6c3dc7c88c"},{url:"js/87.9c64cc75.js",revision:"6593e51aa6c389e3600fb4347852cd06"},{url:"js/88.eb9a7cbe.js",revision:"ade457997d0fc77f89497264b9973bbb"},{url:"js/89.31484030.js",revision:"b01ac80d3e6b67458a88ad9e70e75b9c"},{url:"js/9.e46adf8e.js",revision:"6698506915c29d58ca6f2f46dd955ec4"},{url:"js/90.b809ad3a.js",revision:"505c41981752fccb2028526deb9a5015"},{url:"js/91.7b637a25.js",revision:"d65860f11565a8a32b01aa77afbc7388"},{url:"js/92.4b93c4e7.js",revision:"d378067482dc047aa57fe00a6a2c9e27"},{url:"js/app.3e3f6055.js",revision:"dafcdc32fbe1e2a9a0a8c53ddf9dd622"},{url:"js/chunk-common.97249027.js",revision:"ed4031d3f494b8f8f060761790e09067"},{url:"js/vendor.f0e1a28d.js",revision:"6f6392b0bf3c09d93da869a6232b13c2"},{url:"manifest.json",revision:"22c8cb514c8514731047056824b2bb26"},{url:"media/1/4DGZFCwVDIIv5vm7yBdj8r65kv9qKU0N5kEU2OiV.jpeg",revision:"42908e1fd04989a0238cf2771b1e7ba7"},{url:"media/1/image_2021-09-17_114304.png",revision:"1b0254e8af17695022a90a3013f2d53f"},{url:"media/10/logo2.png",revision:"9c1802311a41ccd73517c0eee25521b9"},{url:"media/13/image-404.jpg",revision:"405046a37c3aca601f7e57b217f33d2a"},{url:"media/14/14584619.jpg",revision:"f428823131e69ee23847f7dd757bc67c"},{url:"media/15/logo-mobile.png",revision:"a5a64a33f3f450e4fb5bbf7f6853d04b"},{url:"media/2/A1QKqn1Wv4kyHNeocAAmPfBmm9ZAkff8SbpeKLtY.jpeg",revision:"68290fa8ab155ed1543f556593ecc2a1"},{url:"media/2/logo.png",revision:"0eafbfc3e1babd9e31b8fed6b525e9cd"},{url:"media/21/16023214373_90552b64f6_o.jpg",revision:"cbdb645d74ebd4abc7d83eac5547c4ef"},{url:"media/22/Chappathi.jpg",revision:"fa95d7560884bf6176508e98861c88fe"},{url:"media/24/lts-tablesdining.jpg",revision:"ff6d0aebedef41f5a026fa7c498d5dc2"},{url:"media/25/Fast-Food-Tables-and-Chairs-Kfc-Restaurant-Tables-and-Chairs-Mcdonald-s-Restaurants-with-Table-and-Chairs-Dining-Table-and-Chairs.jpg",revision:"95fd0999b3002de015d50b7f08551c4b"},{url:"media/26/outdoor-table-let-500x500.jpeg",revision:"91f898021bc8213cbe53d5fd550f1d31"},{url:"media/27/s-l400.jpg",revision:"c9c940a3c8d45451ed6d6fc3a50e42ab"},{url:"media/28/Restaurants-Tables.jpg",revision:"4e900c77b8ecd3c3b34c3a2ca9b6c45f"},{url:"media/3/exywL0KdKipRCSuAuZJcsQLc3zViA0O7Vk9MNPJc.jpeg",revision:"ad10514942722e864187db48eb2bc13a"},{url:"media/33/modern.jpg",revision:"85d4632ece095ea30721764ea781979d"},{url:"media/34/1.jpg",revision:"1f9edd0021c9854ae3d1c6c2433cccb6"},{url:"media/37/pp.jpg",revision:"4b599b3373caa64c7c99636e6e7d59c4"},{url:"media/38/68562297.jpg",revision:"3f1a2f09ac3e8b48d5fe26f7f2ae6ee1"},{url:"media/39/14584619.jpg",revision:"f428823131e69ee23847f7dd757bc67c"},{url:"media/40/kitchen.jpg",revision:"29ce9b0954f6d5edc42c02ebcb4a5a72"},{url:"media/41/hotel-rama-krishna.jpg",revision:"d8fe9b5dc98f04137ef1e70489b4c59d"},{url:"media/42/16023214373_90552b64f6_o.jpg",revision:"cbdb645d74ebd4abc7d83eac5547c4ef"},{url:"media/43/getlstd-property-photo.jpg",revision:"a9d79d919097f6ad4d6d13a7e827235b"},{url:"media/44/extravagant-meal.jpg",revision:"752c22fc050b3e1f1ae842dc2e283724"},{url:"media/45/pathiri.jpg",revision:"64a9c849e5ba181a4b1062f9510b0164"},{url:"media/46/68562297.jpg",revision:"3f1a2f09ac3e8b48d5fe26f7f2ae6ee1"},{url:"media/5/WD2OKbKsSeWA9h6h2Ozb93445EpnUu1EwSXyB0EB.jpeg",revision:"069cae5a79e9d7c6cdac2c3af46fb3e1"},{url:"media/6/logo2.png",revision:"9c1802311a41ccd73517c0eee25521b9"},{url:"media/6/pp.jpg",revision:"b590ce20adc907ea0aae610ea5af8ba3"},{url:"media/7/free-dotted-uae-map-vector.png",revision:"7ea3e259a0227f569ab1a0b5da64f1d4"},{url:"media/7/pp.jpg",revision:"4b599b3373caa64c7c99636e6e7d59c4"},{url:"media/8/14584619.jpg",revision:"f428823131e69ee23847f7dd757bc67c"},{url:"media/9/logo2.png",revision:"9c1802311a41ccd73517c0eee25521b9"},{url:"media/attention.mp3",revision:"d275364deff195599bedc9eb39b8fabe"},{url:"media/customer.jpg",revision:"8a652ac30c99ab0a48f412efb26513ba"},{url:"media/homedelivery.jpg",revision:"3280f1fe80ea6d1487f8f6bd2f0defd9"},{url:"media/item.jpg",revision:"1a1c28f4dc2e5829d70cba5461bd1afd"},{url:"media/kitchen.jpg",revision:"fb1f42d2f7d44657c4d3d06de9353425"},{url:"media/no-image.jpg",revision:"8d32e0fe0868e97e7d5283d6d3e753e3"},{url:"media/remote.jpg",revision:"edf231f41e5dd56c38b759b65d09184c"},{url:"media/sale.jpg",revision:"a8eebfcae40cf9d2d36f2336e07956d7"},{url:"media/seating.jpg",revision:"2501974ca0f8b5df7fc1914689f6e70a"},{url:"media/takeaway.jpg",revision:"6cbb7daaba47d341017fe8a923e4ea52"},{url:"media/user.jpg",revision:"41f5696367000cc71e12f5d54de4621b"},{url:"robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"},{url:"web.config",revision:"df72170f1cdffd64352bb4dafbd6efa0"},{url:"~$Import Data Template.xlsx",revision:"db8ee23edb85db5d94cdf6fc5c0a1104"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
