// any link that is not part of the current domain is modified


function switch_version(dropdown)
{
    var option_value = dropdown.options[dropdown.selectedIndex].value;
    var option_text = dropdown.options[dropdown.selectedIndex].text;
    //alert('The option value is "' + option_value + '"\nand the text is "' + option_text + '"');
    window.location.href = option_value
}
