(function($) {
    "use strict";
    $.fn.searchInTable = function(selector, opt) {
        var defaultOption = {
            inputSelector: "input", // Listen Input selector
            compareTargetAttribute: "value",    // Compare attribute
            compareTargetSelector: "input",    // Compare selector
            inputSelectorTriggerEvent: "keyup",
            refreshSelector: "refresh",
            refreshSelectorTriggerEvent: "click",
            fieldAry: []
        };
        var currentSelector = selector;
        var option = $.extend(defaultOption, opt);
        var that = $(selector);
        var searchIndexAry = initSearchIndex(that, option.fieldAry);
        var skipFirstRow = false;
        $("body").delegate(option.inputSelector, option.inputSelectorTriggerEvent, function() {
           if (option.compareTargetAttribute == 'value') {
                  search($(option.compareTargetSelector).val(), that, option.fieldAry);
           } else {
                  search($(option.compareTargetSelector).attr(option.compareTargetAttribute), that, option.fieldAry);
           }

        });
        $("body").delegate(option.refreshSelector, option.refreshSelectorTriggerEvent, function() {
            refresh(that);
        });

        function refresh(targetTable) {
            if (!$(targetTable).children("tbody")) {
                console.log("No Found " + targetTable);
                return false;
            }
            var tr = $(targetTable).children("tbody").children("tr");
            tr.show();
        }
        function initSearchIndex(targetTable, field)
        {
            field = field || [];
            var th = [];
            if ($(targetTable).children("thead").length) {
                th = $(targetTable).children("thead").children("tr").children("th");
            } else {
                if ($($(targetTable).children("tbody").children("tr")[0]).children("th")) {
                    th = $($(targetTable).children("tbody").children("tr")[0]).children("th");
                } else {
                    th = $($(targetTable).children("tr")[0]).children("td");
                }
                skipFirstRow = true;
            }
            return getSearchIndexAry(field, th) ;
        }

        function search(key, targetTable, field, noHide) {

            var matchedRowIndex = [];
            noHide = noHide || false;
            field = field || [];
            if (!$(targetTable).children("tbody")) {
                console.log("No Found " + targetTable);
                return false;
            }

            var tr = $(targetTable).children("tbody").children("tr");
            if (key == "") {
                tr.show();
                return false;
            }
            if (field.length < 0) {
                return false;
            }

            if (!noHide) {
                tr.hide();
            }

            if (skipFirstRow) {
                $(tr[0]).show();
            }

            
            for (var j = 0; j < searchIndexAry.length; j++) {
                var searchIndex = searchIndexAry[j];
                tr.children("td:nth-child(" + searchIndex + ")").each(function(index) {
                  console.log(key+","+$(this).text());
                    if (compareStr(key, $(this).text()) != -1) {
                        $(this).parent("tr").show();
                        matchedRowIndex.push(index);
                    }
                });
            }
            return matchedRowIndex;
        }

        function getSearchIndexAry(searchField, th)
        {
            var returnSeachIndexAry = [];
            if (searchField.indexOf('*')) {    //Search All column
                th.each(function(i) {
                    returnSeachIndexAry.push(i+1);
                }); 
                return returnSeachIndexAry;
            } else {
                for (var j = 0; j < searchField.length; j++) {
                    th.each(function(i) {
                        if ($(this).attr("data-searchIndex") == searchField[j]) {
                            returnSeachIndexAry.push(i+1);
                        }
                    });
                }
            }
            
            return returnSeachIndexAry;
        }
        function compareStr(searchStr, source) {
            var Reg = new RegExp(searchStr, "g");
            return source.search(Reg);
        }
        var ret = $(currentSelector);

        ret.isMatched = function() {
            return search($(option.compareTargetSelector).attr(option.compareTargetAttribute), that, option.fieldAry, true);
        }
        return ret;

    };
}(jQuery));





