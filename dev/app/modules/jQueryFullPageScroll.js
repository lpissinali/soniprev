(function($){

  /**
   * внутренние методы
   */



  
  var methods = {
      init : function( options ) {

        var settings = $.extend( {
          'containerClass'         : 'sections-container',
        }, options);

        return this.each(function(){
          
          var $this = $(this),
              data = $this.data('fullScreenScroll'),

          if ( ! data ) {
          /**
          * тут производится инициализация и развешивание событий
          */

          }
        });
      },
      scrollTo : function (scrollToSectionIndex) {
        const deltaScroll = scrollToSectionIndex - currentSectionNumber;

        if (deltaScroll > 0) {
          for (let i = 0; i < deltaScroll; i++) {
            scrollDown(SECTIONS_ARRAY[currentSectionNumber + i]);
          }
        }
      },
      destroy : function( ) {

        return this.each(function(){

          var $this = $(this),
              data = $this.data('fullScreenScroll');

          $(window).off('.fullScreenScroll');
          data.fullScreenScroll.remove();
          $this.removeData('fullScreenScroll');

        })

      },
      /**
      * могут следовать прочие публичные методы
      */
  };

  $.fn.tooltip = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Метод с именем ' +  method + ' не существует для fullScreenScroll' );
    }    
  
  };
  
})(jQuery);