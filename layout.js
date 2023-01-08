const express = require('express');
const Layout = require('@podium/layout');
const utils = require('@podium/utils');
const pods = require('./pods-local.json');
const layoutUtils = require('./utils');


const port = process.env.LAYOUT_PORT || 7100

const layout = new Layout({
    name: 'fint-kontroll-layout',
    pathname: '/',
    logger: console,
    context: {
        debug: {
            enabled: true,
        },
    },
});

layout.view((incoming, content) => {
    return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="static/layout.css">
            ${incoming.css.map(utils.buildLinkElement).join('\n')}
            <title>${incoming.view.title}</title>
        </head>
        <body>
            ${content}
            ${incoming.js.map(utils.buildScriptElement).join('\n')}
        </body>
    </html>`;
});


const appbarPod = layout.client.register({
    name: pods.appbar.name,
    uri: pods.appbar.uri,
});
const menuPod = layout.client.register({
    name: pods.menu.name,
    uri: pods.menu.uri,
});





const app = express();
app.use(layout.middleware());


app.use('/static', express.static('static'))


app.get('/', (req, res) => {
    res.redirect(`${layout.pathname()}dashboard`)
})

app.get(`${layout.pathname()}dashboard`, async (req, res, next) => {
    const incoming = res.locals.podium;
    const [appbar, menu] = await Promise.all([
        appbarPod.fetch(incoming),
        menuPod.fetch(incoming)
    ]);

    incoming.podlets = [appbar, menu]

    res.podiumSend(layoutUtils.bodyTemplate(appbar, menu, "Dashboard"));
});



pods.main.forEach((pod) => {

    const podMain = layout.client.register({
        name: pod.name,
        uri: pod.uri,
    });

    app.get(pod.path, async (req, res, next) => {
        const incoming = res.locals.podium;
        const [appbar, menu, main] = await Promise.all([
            appbarPod.fetch(incoming),
            menuPod.fetch(incoming),
            podMain.fetch(incoming)
        ]);

        incoming.podlets = [appbar, menu, main]

        res.podiumSend(layoutUtils.bodyTemplate(appbar, menu, main));
    });

})

app.listen(port, () => console.log("Layout server started!\nRunning on port", port));
