//=======================
// define
//=======================
function ClassDotsManager(slickElementId, numOfItems, numOfDots) {
    this.listDotsElement = $("#" + slickElementId + " ul.slick-dots li");
    this.numOfDots = numOfDots <= numOfItems ? numOfDots : numOfItems;
    this.minIndex = 0;
    this.maxIndex = numOfDots - 1;
    this.showDotsBetween = function (minIndex, maxIndex) {
        this.listDotsElement.filter(function (index) {
            $(this).css("display", index >= minIndex && index <= maxIndex ? "inline-block" : "none");
        });
    };
    this.init = function () {
        this.showDotsBetween(0, this.numOfDots - 1);
    };
    this.updateDots = function (newIndex) {
        if (newIndex >= this.minIndex && newIndex <= this.maxIndex) {
            // don't need to update
        } else {
            if (newIndex > this.maxIndex) {
                this.maxIndex = newIndex;
                this.minIndex = this.maxIndex - this.numOfDots + 1;
            } else {
                this.minIndex = newIndex;
                this.maxIndex = this.minIndex + this.numOfDots - 1;
            }
            this.showDotsBetween(this.minIndex, this.maxIndex);
        }
    };
}

//=====================================================================
// usage (with "small-preview" is the id of div that is used for slick)
//=====================================================================
var dotsManager = new ClassDotsManager("small-preview", listLinks.length, 6);
dotsManager.init();

smallPreviewElement.on("afterChange", function (slick, currentSlide) {
    dotsManager.updateDots(currentSlide.currentSlide);
});
