/**
 * @fileoverview Contains general-use lit-html templates and helper functions.
 *          Functions and templates are added to the window as properties.
 *          Accessible with the 'window.lit.' prefix.
 * @file 'src/content/lit-templates/general.js'
 */

(function(window) {
    window.lit = window.lit || {};

    /**
     * Generates HTML for a small tooltip.
     * 
     * @param {string} tip - Tooltip contents.
     * @returns {TemplateResult} - A lit-html template result representing the HTML markup.
     */
    window.lit.createTooltipDiv = (tip) => html`
        <div class="text-base tooltiptext">${unsafeHTML(tip)}</div>
    `;

})(window);