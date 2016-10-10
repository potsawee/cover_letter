/*!
 * jQuery highlightTextarea 3.1.3
 * Copyright 2014-2016 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
! function(a) {
    "use strict";
    var b = function(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        c = function(b, e) {
            this.settings = a.extend({}, c.DEFAULTS), this.scrollbarWidth = d.getScrollbarWidth(), this.isInput = "input" == b[0].tagName.toLowerCase(), this.active = !1, this.matches = [], this.$el = b, this.$el.wrap('<div class="highlightTextarea"></div>'), this.$main = this.$el.parent(), this.$main.prepend('<div class="highlightTextarea-container"><div class="highlightTextarea-highlighter"></div></div>'), this.$container = this.$main.children().first(), this.$highlighter = this.$container.children(), this.setOptions(e), this.settings.id && (this.$main[0].id = this.settings.id), this.settings.resizable && this.applyResizable(), this.updateCss(), this.bindEvents(), this.highlight()
        };
    c.DEFAULTS = {
        words: {},
        ranges: {},
        color: "#ffff00",
        caseSensitive: !0,
        wordsOnly: !1,
        resizable: !1,
        resizableOptions: {},
        id: "",
        debug: !1
    }, c.prototype.highlight = function() {
        console.log('highlight');
        var b = this.$el.val(),
            c = this;
        c.spacer = "", this.settings.wordsOnly && (c.spacer = "\\b");
        var e = [];
        if (a.each(this.settings.words, function(d, f) {
                var g = new RegExp(c.spacer + "(" + f.join("|") + ")" + c.spacer, c.regParam),
                    h = b.match(g);
                if (h) {
                    var i = [];
                    a.each(h, function(a, c) {
                        e.push(c), -1 === i.indexOf(c) && (b = b.replace(new RegExp(c, "g"), '<mark style="background-color:' + d + ';">$&</mark>', "g"), i.push(c))
                    })
                }
            }), a.each(this.settings.ranges, function(a, c) {
                if (c.start < b.length) {
                    b = d.strInsert(b, c.end, "</mark>");
                    var e = '<mark style="background-color:' + c.color + ';"';
                    null != c["class"] && (e += 'class="' + c["class"] + '"'), e += ">", b = d.strInsert(b, c.start, e)
                }
            }), e.length !== this.matches.length) {
            this.matches = e;
            var f = a.Event("matchesChanged");
            f.matches = this.matches, this.$el.trigger(f)
        }
        this.$highlighter.html(b), this.updateSizePosition()
    }, c.prototype.setWords = function(a) {
        this.setOptions({
            words: a,
            ranges: {}
        })
    }, c.prototype.setRanges = function(a) {
        this.setOptions({
            words: {},
            ranges: a
        })
    }, c.prototype.enable = function() {
        this.bindEvents(), this.highlight()
    }, c.prototype.disable = function() {
        this.unbindEvents(), this.$highlighter.empty()
    }, c.prototype.destroy = function() {
        this.disable(), d.cloneCss(this.$container, this.$el, ["background-image", "background-color", "background-position", "background-repeat", "background-origin", "background-clip", "background-size", "background-attachment"]), this.$main.replaceWith(this.$el), this.$el.removeData("highlighter")
    }, c.prototype.setOptions = function(b) {
        "object" != typeof b || a.isEmptyObject(b) || (a.extend(this.settings, b), this.regParam = this.settings.caseSensitive ? "gm" : "gim", a.isEmptyObject(this.settings.words) ? a.isEmptyObject(this.settings.ranges) || (this.settings.words = {}, this.settings.ranges = d.cleanRanges(this.settings.ranges, this.settings.color)) : (this.settings.words = d.cleanWords(this.settings.words, this.settings.color), this.settings.ranges = {}), this.settings.debug ? this.$main.addClass("debug") : this.$main.removeClass("debug"), this.active && this.highlight())
    }, c.prototype.bindEvents = function() {
        if (!this.active) {
            this.active = !0;
            var b = this;
            this.$highlighter.bind({
                "this.highlighter": function() {
                    b.$el.focus()
                }
            }), this.$el.bind({
                "input.highlightTextarea": d.throttle(function() {
                    this.highlight()
                }, 100, this),
                "resize.highlightTextarea": d.throttle(function() {
                    this.updateSizePosition(!0)
                }, 50, this),
                "scroll.highlightTextarea select.highlightTextarea": d.throttle(function() {
                    this.updateSizePosition()
                }, 50, this)
            }), this.isInput && this.$el.bind({
                "keydown.highlightTextarea keypress.highlightTextarea keyup.highlightTextarea": function() {
                    setTimeout(a.proxy(b.updateSizePosition, b), 1)
                },
                "blur.highlightTextarea": function() {
                    this.value = this.value, this.scrollLeft = 0, b.updateSizePosition.call(b)
                }
            })
        }
    }, c.prototype.unbindEvents = function() {
        this.active && (this.active = !1, this.$highlighter.off(".highlightTextarea"), this.$el.off(".highlightTextarea"))
    }, c.prototype.updateCss = function() {
        d.cloneCss(this.$el, this.$main, ["float", "vertical-align"]), this.$main.css({
            width: this.$el.outerWidth(!0),
            height: this.$el.outerHeight(!0)
        }), d.cloneCss(this.$el, this.$container, ["background-image", "background-color", "background-position", "background-repeat", "background-origin", "background-clip", "background-size", "background-attachment", "padding-top", "padding-right", "padding-bottom", "padding-left"]), this.$container.css({
            top: d.toPx(this.$el.css("margin-top")) + d.toPx(this.$el.css("border-top-width")),
            left: d.toPx(this.$el.css("margin-left")) + d.toPx(this.$el.css("border-left-width")),
            width: this.$el.width(),
            height: this.$el.height()
        }), d.cloneCss(this.$el, this.$highlighter, ["font-size", "font-family", "font-style", "font-weight", "font-variant", "font-stretch", "vertical-align", "word-spacing", "text-align", "letter-spacing", "text-rendering"]), this.$el.css({
            background: "none"
        })
    }, c.prototype.applyResizable = function() {
        if (jQuery.ui) {
            var b = {
                    handles: "se",
                    resize: d.throttle(function() {
                        this.updateSizePosition(!0)
                    }, 50, this)
                },
                c = a.extend({}, b, this.settings.resizableOptions);
            this.$el.resizable(c)
        }
    }, c.prototype.updateSizePosition = function(a) {
        a && (this.$main.css({
            width: this.$el.outerWidth(!0),
            height: this.$el.outerHeight(!0)
        }), this.$container.css({
            width: this.$el.width(),
            height: this.$el.height()
        }));
        var b, c = 0;
        this.isInput ? b = 99999 : (("scroll" == this.$el.css("overflow") || "scroll" == this.$el.css("overflow-y") || "hidden" != this.$el.css("overflow") && "hidden" != this.$el.css("overflow-y") && this.$el[0].clientHeight < this.$el[0].scrollHeight) && (c = this.scrollbarWidth), b = this.$el.width() - c), this.$highlighter.css({
            width: b,
            height: this.$el.height() + this.$el.scrollTop(),
            top: -this.$el.scrollTop(),
            left: -this.$el.scrollLeft()
        })
    };
    var d = function() {};
    d.getScrollbarWidth = function() {
        var b = a('<div style="width:50px;height:50px;overflow:auto"><div>&nbsp;</div></div>').appendTo("body"),
            c = b.children(),
            d = c.innerWidth() - c.height(100).innerWidth();
        return b.remove(), d
    }, d.cloneCss = function(a, b, c) {
        for (var d = 0, e = c.length; e > d; d++) b.css(c[d], a.css(c[d]))
    }, d.toPx = function(b) {
        if (b != b.replace("em", "")) {
            var c = a('<div style="font-size:1em;margin:0;padding:0;height:auto;line-height:1;border:0;">&nbsp;</div>').appendTo("body");
            return b = Math.round(parseFloat(b.replace("em", "")) * c.height()), c.remove(), b
        }
        return b != b.replace("px", "") ? parseInt(b.replace("px", "")) : parseInt(b)
    }, d.htmlEntities = function(b) {
        return b ? a("<div></div>").text(b).html() : ""
    }, d.strInsert = function(a, b, c) {
        return a.slice(0, b) + c + a.slice(b)
    }, d.throttle = function(a, b, c) {
        var d = {
            pid: null,
            last: 0
        };
        return function() {
            function e() {
                return d.last = (new Date).getTime(), c ? a.apply(c, Array.prototype.slice.call(g)) : a.apply(h, Array.prototype.slice.call(g))
            }
            var f = (new Date).getTime() - d.last,
                g = arguments,
                h = this;
            return f > b ? e() : (clearTimeout(d.pid), void(d.pid = setTimeout(e, b - f)))
        }
    }, d.cleanWords = function(b, c) {
        var e = {};
        a.isArray(b) || (b = [b]);
        for (var f = 0, g = b.length; g > f; f++) {
            var h = b[f];
            if (a.isPlainObject(h)) {
                e[h.color] || (e[h.color] = []), a.isArray(h.words) || (h.words = [h.words]);
                for (var i = 0, j = h.words.length; j > i; i++) e[h.color].push(d.htmlEntities(h.words[i]))
            } else e[c] || (e[c] = []), e[c].push(d.htmlEntities(h))
        }
        return e
    }, d.cleanRanges = function(c, d) {
        var e = [];
        (a.isPlainObject(c) || b(c[0])) && (c = [c]);
        for (var f = 0, g = c.length; g > f; f++) {
            var h = c[f];
            if (a.isArray(h)) e.push({
                color: d,
                start: h[0],
                end: h[1]
            });
            else if (h.ranges) {
                (a.isPlainObject(h.ranges) || b(h.ranges[0])) && (h.ranges = [h.ranges]);
                for (var i = 0, j = h.ranges.length; j > i; i++) a.isArray(h.ranges[i]) ? e.push({
                    color: h.color,
                    "class": h["class"],
                    start: h.ranges[i][0],
                    end: h.ranges[i][1]
                }) : (h.ranges[i].length && (h.ranges[i].end = h.ranges[i].start + h.ranges[i].length), e.push(h.ranges[i]))
            } else h.length && (h.end = h.start + h.length), e.push(h)
        }
        e.sort(function(a, b) {
            return a.start == b.start ? a.end - b.end : a.start - b.start
        });
        var k = -1;
        return a.each(e, function(b, c) {
            c.start >= c.end && a.error("Invalid range end/start"), c.start < k && a.error("Ranges overlap"), k = c.end
        }), e.reverse(), e
    }, a.fn.highlightTextarea = function(b) {
        var d = arguments;
        return this.each(function() {
            var e = a(this),
                f = e.data("highlighter"),
                g = "object" == typeof b && b;
            (f || "destroy" != b) && (f || (f = new c(e, g), e.data("highlighter", f)), "string" == typeof b && f[b].apply(f, Array.prototype.slice.call(d, 1)))
        })
    }
}(window.jQuery || window.Zepto);