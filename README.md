# searchInTable


# How To use It.
  
  Add script 
  
    <script src="searchInTable.js"></script>
 
  Configure searchInTable Configure
          full option like this.
          
          var option = {
                inputSelector: '', // Listen Input selector
                compareTargetAttribute: '',    // Compare attribute
                compareTargetSelector: '',    // Compare selector
                inputSelectorTriggerEvent: '', // Input selector Trigger event to search 
                refreshSelector: '',    // Refresh Table Selector
                refreshSelectorTriggerEvent: '',    // Refresh selector trigger
                fieldAry: [] , //Search those columns which map th's data-searchIndex.  Or You can assign '*' to seach whole column.
            };
            
  You can simplely to assign option to feel it's power.
          
            var option = {
                   fieldAry: ['name','*'] 
            };
 And attach to table just do this:
       
            $('table').searchInTable('table', option);
 So You just add an text input, and typing some keyword, it will show rows which match your keyword
       
       
       
