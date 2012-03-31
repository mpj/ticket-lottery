module.exports = function(arrContainer, arrFind) {
    for(var i=0;i<arrContainer.length;i++)
        if (arrayMatchesArray(arrContainer[i], arrFind))
            return true;
    return false;
}

function arrayMatchesArray(left, right) {
    for(var i=0;i<left.length;i++)
        if(left[i] != right[i])
            return false;
    return true;
}