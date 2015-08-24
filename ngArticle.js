'use strict';
angular.module('ag.service', []).filter('ngArticle', ['$sce', function($sce) {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    return function(input, arg) {
        if (!input) return '';

        // decode html, if necessary
        // input = input.replace(/(&#10;)/g, ' <br> ');
        // input = input.replace(/(<p><\/p>)/g, '<p>&nbsp;</p>');
        // input = decodeHtml(input);

        if (arg) {

            // add lightbox tag in imgs inside html article
            var $html = $('<div>' + input + '</div>');
            $html.find('img').each(function(i, img) {
                $(img).wrap($('<a />').attr('href', img.src).attr('data-lightbox', 'lb-' + arg));
            });

            // reload img, if cached
            // $html.find("img").one("load", function() {
            //     var a = 1;
            // }).each(function() {
            //     if (this.complete)
            //         $(this).load();
            // });

            input = $html.html();
        }
        return $sce.trustAsHtml(input);
    }
}])
