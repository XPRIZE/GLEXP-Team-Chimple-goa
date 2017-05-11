(function ($) {

    window.chimpleStory = {

        load: function () {
            chimpleStory.loadStory();
        },
        loadStory: function () {
            //jQuery('#results').append('<canvas id="gameCanvas" width="480" height="720"></canvas>');            
            chimpleStory.draw();
        },

        draw: function () {
            
            var canvas = document.getElementById("gameCanvas");
            // if (canvas.getContext) {                
            //     var context = canvas.getContext("2d");
            //     context.fillStyle = "red";
            //     context.fillRect(0, 0, 1, 1);
            //     context.strokeStyle = "Blue";

            //     context.font = "italic small-caps bold 44pt 'Comic Sans MS'";
            //     context.textAlign = "left";
            //     context.strokeText("Hello", 10, 100);
            //     context.fillText("World!", 10 + context.measureText("Hello ").width, 100);
            // }

        }
    }

})(jQuery);
