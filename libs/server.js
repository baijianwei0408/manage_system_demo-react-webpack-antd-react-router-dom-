import express from 'express';
import React from 'react';

/**创建服务器*/
const app = express();

// let template = fs.readFileSync(path.resolve(__dirname, "../../../dist/index.html"));
//
//
// routers.forEach(router => {
//     app.get(router.path, function (req, res) {
//         const app = ReactDOMServer.renderToString(
//             <Provider {...stores}>
//                 <StaticRouter>
//                     {router.component}
//                 </StaticRouter>
//             </Provider>
//         )
//
//         let html = template.toString().replace('<div id="root"></div>', `<div id="root"><div>SPA SPA SPA</div>${app}</div>`)
//
//         console.log('SPA Success')
//         res.send(html);
//     });
// });
//

app.use('/', express.static('./dist'));

app.listen(3000, function () {
    console.log('running on port ' + 3000);
});
