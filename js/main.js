$(document).ready(function () {
    $('#Error').css('display', 'none');

    $('#btnConvert').click(function () {
        var IsValid = ValidateInput();
        if (IsValid) {
            $('#Error').css('display', 'none');
            var input = parseInt($('#txtInput').val());
            var dvResult = $('#dvResults');
            var lblResult = $('#result');
            if (input == 0){
                lblResult.html('Zero');
                dvResult.css('display','block')
                return;
            }
            if (input > 0) {
                var words0 = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine "];
                var words1 = ["Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
                var words2 = ["Twenty ", "Thirty ", "Forty ", "Fifty ", "Sixty ", "Seventy ", "Eighty ", "Ninety "];
                var words3 = [" Thousand ", " Million ", " Billion "];
                var num = [];
                var first = 0;
                var u, h, t;
                var andWord = 'and ';
                var output = '';
                num[0] = input % 1000;// units
                num[1] = parseInt(input / 1000);
                num[2] = parseInt(input / 1000000);
                num[1] = num[1] - 1000 * num[2];  // thousands
                num[3] = parseInt((input / 1000000000).toFixed(5));     // billions
                num[2] = num[2] - 1000 * num[3];  // millions

                for (var i = 3; i > 0; i--) {
                    if (num[i] != 0) {
                        first = i;
                        break;
                    }
                }
                for (var j = first; j >= 0; j--) {
                    if (num[j] == 0)
                        continue;
                    u = num[j] % 10;// ones
                    t = parseInt(num[j] / 10);
                    h = parseInt(num[j] / 100);// hundreds
                    t = parseInt(parseInt(t) - 10 * parseInt(h));// tens
                    if (h > 0)
                        output = output + words0[parseInt(h)] + " Hundred ";

                    if (u > 0 || t > 0) {
                        if (h > 0 || j < first)
                            output = output + andWord;
                        if (t == 0)
                            output = output + words0[u];
                        else if (t == 1)
                            output = output + words1[u];
                        else
                            output = output + words2[t - 2] + words0[u];
                    }
                    if (j != 0)
                        output = output + (words3[j - 1]);
                }
                lblResult.html(output);
                dvResult.css('display', 'block');
            }
        }
        else {
            $('#dvResults').css('display', 'none');
            $('#Error').css('display', 'block');
        }
    });
});

function ValidateInput() {
    var input = $('#txtInput').val();
    //$('#Error').css('display', input == '' ? 'none' : 'block');     /^\+?(0|[1-9]\d*)$/.test(str)    style="border: 1px solid black;width:60%;margin-left:40px;"
    if (input == '') {
        return false;
    }
    else {

        if (!isNaN(parseFloat(input)) && isFinite(input)) {
            return true;
        }
        else {
            return false;
        }

        //return isNaN(input) ? false : true;
    }
}