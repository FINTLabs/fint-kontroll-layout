 const  bodyTemplate = (appbar, menu, main) => {

    return `
    <div class="grid-container">
        <div class="grid-header">
            ${appbar}
        </div>
        <div class="grid-menu">
            ${menu}
        </div>
        <div class="grid-main">
            ${main}
        </div>
     </div>
    `
}

module.exports = {
    bodyTemplate
}
