/*
Example

<a class="copyBtn" data-clipboard-target="#aa">Export Table Data</a>
#aa= copy target element id

*/
var clipboard = new Clipboard('.copyBtn');

clipboard.on('success', function(e)
{
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});

clipboard.on('error', function(e)
{
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
