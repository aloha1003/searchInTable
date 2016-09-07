(function($) {
    "use strict";
    $.fn.searchInTable = function(selector, opt) {
        var defaultOption = {
            'inputSelector': 'input',
            'inputSelectorTriggerEvent': 'keyup',
            'refreshSelector': 'refresh',
            'refreshSelectorTriggerEvent': 'click',
            'fieldAry': []
        };
        var option = $.extend(defaultOption, opt);
        var that = $(this);
        $('body').delegate(option.inputSelector, option.inputSelectorTriggerEvent, function() {
            search($(this).val(), that, option.fieldAry);
        });
        $('body').delegate(option.refreshSelector, option.refreshSelectorTriggerEvent, function() {
            refresh(that);
        });

        function refresh(targetTable) {
            if (!$(targetTable).children('tbody')) {
                console.log("No Found " + targetTable);
                return false;
            }
            var tr = $(targetTable).children('tbody').children('tr');
            tr.show();
        }

        function search(key, targetTable, field = []) {
            if (!$(targetTable).children('tbody')) {
                console.log("No Found " + targetTable);
                return false;
            }
            var tr = $(targetTable).children('tbody').children('tr');
            var th = $(targetTable).children('thead').children('tr').children('th');
            var thead = $(targetTable).children('thead');
            if (key == '') {
                tr.show();
                return true;
            }
            if (field.length < 0) {
                return false;
            }
            tr.hide();
            for (var j = 0; j < field.length; j++) {
                var searchIndex = -1;
                th.each(function(i) {
                    if ($(this).attr('class') == field[j]) {
                        searchIndex = i;
                        return true;
                    }
                });
                searchIndex += 1;
                if (searchIndex == 0) {
                    console.log("No Found Field :" + field[j]);
                }

                tr.children('td:nth-child(' + searchIndex + ')').each(function() {
                    if (compareStr(key, $(this).text()) != -1) {

                        $(this).parent('tr').show();
                    }
                });
            }

        }

        function compareStr(searchStr, source) {
            var Reg = new RegExp(searchStr, 'g');
            return source.search(Reg);
        }
        return {};

    };
}(jQuery));
