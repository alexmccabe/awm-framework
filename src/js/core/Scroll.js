/*eslint*/
/*global $*/
class ScrollClass {
    constructor () {
        this.$body = $('body');

        this.styles = {
            disabled: {
                'height': '100%',
                'overflow': 'hidden',
            },

            enabled: {
                'height': '',
                'overflow': '',
            }
        };
    }

    disable ($element = $(window)) {
        let disabled = false;
        let scrollTop = window.pageYOffset;

        $element
            .on('scroll.disablescroll', (event) => {
                event.preventDefault();

                this.$body.css(this.styles.disabled);

                window.scrollTo(0, scrollTop);
                return false;
            })
            .on('touchstart.disablescroll', () => {
                disabled = true;
            })
            .on('touchmove.disablescroll', (event) => {
                if (disabled) {
                    event.preventDefault();
                }
            })
            .on('touchend.disablescroll', () => {
                disabled = false;
            });
    }

    enable ($element = $(window)) {
        $element.off('.disablescroll');

        this.$body.css(this.styles.enabled);
    }
}

export const Scroll = new ScrollClass();