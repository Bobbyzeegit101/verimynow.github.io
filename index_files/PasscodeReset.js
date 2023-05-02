//This Script file is user only for Passcode Reset Page
var stepIndex = 1;

//variable for implementing input masking
var creditcardnumber_unmasked = '';
var creditcarddetail = '';
var debitcardnumber_unmasked = '';
var debitcarddetail = '';
var pinnumber = '';



/*--------------------- Password Validation---------------------------------------------*/
$.validator.unobtrusive.adapters.add("custompasswordvalidation", "", function (options) {
    options.rules['custompasswordvalidationmethod'] = options.params;
});


jQuery.validator.addMethod("specialchar", function (value, element, param) {
    if (param != true) {
        for (var i = 0; i < param.length;) {
            if ($.trim($(param[i]).val()) != "") {
                return /^([a-zA-Z0-9 ]+)$/.test($(param[i]).val());
            }
            return true;
        }
    } else {
        return this.optional(element) || /^([a-zA-Z0-9 ]+)$/.test(value);
    }

});

jQuery.validator.addMethod("custompasswordvalidationmethod", function (value) {
    $.validator.messages.ReEnterPasscodeRequired = "Please enter your New Passcode.";
    if ($('#NewPasscode').val().length <= 0) {
        $.validator.messages.custompasswordvalidationmethod = "Please enter your New Passcode.";
        return false;
    }
    if ($('#NewPasscode').val().length > 0 && $('#NewPasscode').val().length < 8) {
        ClearPasscodeFields();
        $.validator.messages.custompasswordvalidationmethod = "Your New Passcode must have a minimum of 8 characters.<br/>Please re-enter your New Passcode.";
        return false;
    }
    if (!value.match(/.*(?=.*[A-Z]).*/)) {
        ClearPasscodeFields();
        $.validator.messages.custompasswordvalidationmethod = "Your New Passcode must contain at least one UPPER case letter." + "</br>" + "Please re-enter your New Passcode.";
        return false;
    }
    if (!value.match(/.*(?=.*[a-z]).*/)) {
        ClearPasscodeFields();
        $.validator.messages.custompasswordvalidationmethod = "Your New Passcode must contain at least one lower case letter." + "</br>" + "Please re-enter your New Passcode.";
        return false;
    }
    if (!value.match(/.*(?!^.*[#&* ].*$)^.*$.*/)) {
        ClearPasscodeFields();
        $.validator.messages.custompasswordvalidationmethod = "Your New Passcode may not include the following special characters:<b>& # *</b></br>Please re-enter your New Passcode.";
        return false;
    }
    if (/(.)\1{3,}/i.test(value)) {
        ClearPasscodeFields();
        $.validator.messages.custompasswordvalidationmethod = "Your New Passcode cannot have more than 3 repeating characters." + "</br>" + "Please re-enter your New Passcode.";
        return false;
    }
    if ($("#UserId").val().toUpperCase() == $("#NewPasscode").val().toUpperCase()) {
        $.validator.messages.custompasswordvalidationmethod = "Your New Passcode cannot be the same as your User ID." + "</br>" + "Please create another Passcode.";
        $("#ReenterPasscode").addClass('input-validation-error');
        return false;
    }
    if (($('#NewPasscode').val().length > 0 && $('#ReenterPasscode').val().length > 0) && ($('#NewPasscode').val() != $('#ReenterPasscode').val())) {
        $.validator.messages.custompasswordvalidationmethod = "The Passcodes you entered do not match.<br/>Please re-enter both Passcode fields.";
        return false;
    }
    return true;
}, $.validator.messages.custompasswordvalidationmethod);

jQuery.validator.addMethod("CreditCardInfoRequiredMethod", function (value, element) {
    if ($('#CreditCardNumber').val() == "") {
        return false;
    }
    return true;
}, $.validator.messages.CreditCardInfoRequiredMethod);

jQuery.validator.addMethod("CreditCardPinRequiredMethod", function (value, element) {
    if ($('#CreditCardPin').val() == "") {
        return false;
    }
    return true;
}, $.validator.messages.CreditCardPinRequiredMethod);


function ClearPasscodeFields() {
    $('#NewPasscode').focus();
    $('#NewPasscode').val('');
    $('#ReenterPasscode').val('');
    $.validator.messages.ReEnterPasscodeRequired = "";
    $('#ReenterPasscode').removeClass('input-validation-error').addClass('valid');
    $('#ReenterPasscode').removeClass('password');
}

jQuery.validator.addMethod("ReEnterPasscodeRequired",
    function () {
        if ((($('#NewPasscode').val().length > 0 && $('#ReenterPasscode').val().length > 0) && ($('#NewPasscode').val() != $('#ReenterPasscode').val())) || ($("#UserId").val().toLowerCase() == $('#NewPasscode').val().toLowerCase())) {
            $('#NewPasscode').val('');
            $('#ReenterPasscode').val('');
            $.validator.messages.ReEnterPasscodeRequired = "";

            return false;
        }

        if ($('#ReenterPasscode').val().length <= 0 && $.validator.messages.ReEnterPasscodeRequired != "") {
            $.validator.messages.ReEnterPasscodeRequired = "Please enter your New Passcode.";
            return false;
        }
        return true;
    },
    "Please enter your New Passcode."
);

/*---------------------------------------------------------------------------------------*/
$(document).ready(function () {
    $('<input>').attr({ type: 'hidden', id: 'dp', name: 'DevicePrint', value: encode_deviceprint() }).appendTo('form');

    var mtgAccountOptionId = $("input[type='radio'][value='MortgageAccount']").attr('id');
    var otpOptionId = $("input[type='radio'][value='OOB_EMAIL']").attr('id');
    //$("#SecurityAnswer1,#SecurityAnswer2").keydown(function (event) {
    //    VerifyAlphaNumericWithSpace(event);
    //});
    $('[id^="SecurityAnswer"]').preventSpecialChar({ regex: '[a-z0-9A-Z ]' });

    PreventMultipleFormSubmissions();
    MTBEnterButtonClick("btnNext", "divStep1");
    MTBEnterButtonClick("btnStep2Next", "divStep2");
    MTBEnterButtonClick("btnSubmit", "divStep3");

    $("#UserId, #SocialSecurityNumber").focusin(function () {
        $(this).keydown(function (event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    });
    var stepNum = ($("#StepNumber").val());
    switch (stepNum) {
        case '2':
            if (($("#ErrorValid").val()) == "False") {
                TagWizardStep(stepNum); // Defect # 3039 fix, tag page name for step 2
            }
            if ($("#ResetUserType").val().toUpperCase() != "B") {
                $("#spMtgAccountNumber").show();
                $("#spOnlineBanking").hide();
            }
            break;
        case '3':
            TagWizardStep(stepNum);
            break;
        case '4':
            TagWizardStep(stepNum);
            var stepNum = $("#StepNumber").val();
            $("#divStep" + stepNum).parent("form").addClass("botbord");
            break;
    }

    jQuery.fn.exists = function () { return this.length > 0; };
    var validator;
    validator = $("form").validate();


    //Disable Validaion on KeyUp and Focusout
    var validator = $("form").data("validator");
    if (validator) {
        validator.settings.onkeyup = false; // disable validation on keyup
        validator.settings.onfocusout = false;
    }
    //Rules added

    $("#SecurityAnswer1").rules("add", {
        specialchar: true,
        messages: {
            specialchar: "Your Security Question 1 answer cannot contain special characters.Please re-enter your answer for Security Question 1."
        }
    });
    $("#SecurityAnswer2").rules("add", {
        specialchar: true,
        messages: {
            specialchar: "Your Security Question 2 answer cannot contain special characters.Please re-enter your answer for Security Question 2."
        }
    });

    if ($('#NewPasscode').exists()) {
        $("#NewPasscode").rules("add", {
            equalTo: {
                param: '#ReenterPasscode',
                depends: function () {
                    return $("#ReenterPasscode").val() != '';
                }
            },
            messages: {
                equalTo: "The Passcodes you entered do not match.<br/>Please re-enter both Passcode fields."
            }
        });
    }
    if ($('#ReenterPasscode').exists()) {
        $("#ReenterPasscode").rules("add", {
            ReEnterPasscodeRequired: true,
            equalTo: {
                param: '#NewPasscode',
                depends: function () {
                    return $("#NewPasscode").val() != '';
                }
            },
            messages: {
                equalTo: ""
            }
        });
    }

    if ($('#CreditCardNumber').exists()) {
        $("#CreditCardNumber").rules("add", {
            CreditCardInfoRequiredMethod: true,
            messages: {
                CreditCardInfoRequiredMethod: "Please enter your Card Number."
            }
        });
    }

    if ($('#CreditCardPin').exists()) {
        $("#CreditCardPin").rules("add", {
            CreditCardPinRequiredMethod: true,
            messages: {
                CreditCardPinRequiredMethod: "Please enter your 3-Digit Security Code."
            }
        });
    }

    var stepNumber = $("#StepNumber").val();
    $('#divStep' + stepNumber).show();
    $('#buttonSection' + stepNumber).show();

    $('#UserId,#NewPasscode,#ReenterPasscode').keydown(function (event) {
        //AlphaNumeric
        //Special characters allowed
        //no spaces
        if (event.keyCode == 32) {
            event.preventDefault();
        }
    });


    // To Prevent Copy Paste for New and Re-enter Passcode Fields
    $("#NewPasscode,#ReenterPasscode").bind('copy paste cut', function (e) {
        try {
            e.preventDefault();
        } //Non-IE
        catch (x) {
            e.returnValue = false;
        } //IE


    });

    // To Prevent Pasting of Security Quesion
    $("#SecurityAnswer1").bind('paste', function () {
        setTimeout(function () {
            validator.showErrors({ SecurityAnswer1: "" });
            var data = $.trim($('#SecurityAnswer1').val());

            var letters = /^[0-9a-zA-Z\s]+$/;;
            if (letters.test(data)) {
                $("#SecurityAnswer1").val(data);
                return true;
            } else {

                validator.showErrors({ SecurityAnswer1: "Your Security Answer cannot contain special characters. Please re-enter your Security Answer." });
                $("#SecurityAnswer1").val("");
                return false;
            }
        });

    });
    $("#SecurityAnswer2").bind('paste', function () {
        setTimeout(function () {
            validator.showErrors({ SecurityAnswer2: "" });
            var data = $.trim($('#SecurityAnswer2').val());

            var letters = /^[0-9a-zA-Z\s]+$/;;
            if (letters.test(data)) {
                $("#SecurityAnswer2").val(data);
                return true;
            } else {

                validator.showErrors({ SecurityAnswer2: "Your Security Answer cannot contain special characters. Please re-enter your Security Answer." });
                $("#SecurityAnswer2").val("");
                return false;
            }
        });

    });

    // To Prevent Pasting of Security Quesion
    $("#SecurityAnswer1").bind('paste', function () {
        setTimeout(function () {
            validator.showErrors({ SecurityAnswer1: "" });
            var data = $.trim($('#SecurityAnswer1').val());

            var letters = /^[0-9a-zA-Z\s]+$/;;
            if (letters.test(data)) {
                $("#SecurityAnswer1").val(data);
                return true;
            } else {
                validator.showErrors({ SecurityAnswer1: "Your Security Answer cannot contain special characters.Please re-enter your Security Answer." });
                $("#SecurityAnswer1").val("");
                return false;
            }
        });

    });
    $("#SecurityAnswer2").bind('paste', function () {
        setTimeout(function () {
            validator.showErrors({ SecurityAnswer2: "" });
            var data = $.trim($('#SecurityAnswer2').val());

            var letters = /^[0-9a-zA-Z\s]+$/;;
            if (letters.test(data)) {
                $("#SecurityAnswer2").val(data);
                return true;
            } else {

                validator.showErrors({ SecurityAnswer2: "Your Security Answer cannot contain special characters.Please re-enter your Security Answer." });
                $("#SecurityAnswer2").val("");
                return false;
            }
        });

    });


    /*Masking Mortgage Account Number*/
    $("#MtgAccountNumber").focusin(function () {
        if ($(this).val() != "") {
            $("#MtgAccountNumber").mask("99999999999999999999", { placeholder: " " }).val($("#FormattedCardNumber").val());
        }
    });

    $("#MtgAccountNumber").blur(function () {
        var mtgacct = $("#MtgAccountNumber").val();
        $("#FormattedCardNumber").val(mtgacct);
        if (mtgacct.length > 0) {
            $("#MtgAccountNumber").mask("99999999999999999999", { placeholder: " " }).val("XXXXXXXXXX" + mtgacct.substring(mtgacct.length - 4, mtgacct.length));
        }
    });


    /*-----------masking for credit card number-----------------------*/
    // if ($("#ResetUserType").val().toUpperCase() == "R") {
    if ($('#CreditPinNumber').exists() && $('#CreditCardNumber').exists()) {
        if ($("#CreditPinNumber").val() != '') {
            pinnumber = $("#CreditPinNumber").val();
            $("#CreditCardPin").val(pinnumber);
        }
        if ($("#CreditCardNumber").val().length != 19) {
            $("#CreditCardNumber").mask("9999-9999-9999-9999", { placeholder: " " });
            if ($("#ResetUserType").val().toUpperCase() != "B") {
                $('#spMtgAccountNumber').removeClass('hide').show();
            }
        } else {
            creditcardnumber_unmasked = $("#FormattedCardNumber").val();
            creditcarddetail = creditcardnumber_unmasked.split("-");
            $("#CreditCardNumber").mask("9999-9999-9999-9999", { placeholder: " " }).val("XXXX-XXXX-XXXX-" + creditcarddetail[3]);
        }

        $("#CreditCardNumber").focusin(function () {
            if ($(this).val() != "") {
                $(this).mask("9999-9999-9999-9999", { placeholder: " " }).val(creditcardnumber_unmasked);
            }
        });

        $("#CreditCardNumber").blur(function () {
            $(this).val($(this).val().replace(/ /g, ''));
            creditcardnumber_unmasked = $(this).val();
            $("#FormattedCardNumber").val(creditcardnumber_unmasked);
            creditcarddetail = creditcardnumber_unmasked.split("-");
            if ($(this).val().length == 19) {
                $(this).mask("9999-9999-9999-9999", { placeholder: " " }).val("XXXX-XXXX-XXXX-" + creditcarddetail[3]);
            }
        });
    }
    //}


    /*-----------masking for debit card number-----------------------*/
    if ($('#CreditPinNumber').exists() && $('#DebitCardNumber').exists()) {
        if ($("#DebitPinNumber").val() != '') {
            pinnumber = $("#DebitPinNumber").val();
            $("#DebitCardPin").val(pinnumber);
        }
        if ($("#DebitCardNumber").val().length != 19) {
            $("#DebitCardNumber").mask("9999-9999-9999-9999", { placeholder: " " });
        } else {
            debitcardnumber_unmasked = $("#FormattedCardNumber").val();
            debitcarddetail = debitcardnumber_unmasked.split("-");
            $("#DebitCardNumber").mask("9999-9999-9999-9999", { placeholder: " " }).val("XXXX-XXXX-XXXX-" + debitcarddetail[3]);
        }

        $("#DebitCardNumber").focusin(function () {
            if ($(this).val() != "") {
                $(this).mask("9999-9999-9999-9999", { placeholder: " " }).val(debitcardnumber_unmasked);

            }
        });

        $("#DebitCardNumber").blur(function () {
            $(this).val($(this).val().replace(/ /g, ''));
            debitcardnumber_unmasked = $(this).val();
            $("#FormattedCardNumber").val(debitcardnumber_unmasked);
            debitcarddetail = debitcardnumber_unmasked.split("-");
            if ($(this).val().length == 19) {
                $(this).mask("9999-9999-9999-9999", { placeholder: " " }).val("XXXX-XXXX-XXXX-" + debitcarddetail[3]);
            }

        });
    }


    /*----------------------------------------------------------------------------------------------*/
    $('[name^="DebitCardNumber"],#MtgAccountNumber,[name^="SocialSecurityNumber"],#DebitCardPin').keydown(function (event) {
        VerifyNumberKey(event);
    });

    if ($("#ResetUserType").val().toUpperCase() == "R" || $("#ResetUserType").val().toUpperCase() == "B") {
        $('[name^="CreditCardNumber"],#CreditCardPin').keydown(function (event) {
            VerifyNumberKey(event);
        });
    }

    $.uniform.update();
    $("#divCheckCard").show();
    $("#divCreditCard,#divOnlineBanking").hide();

    if ($("#ResetOption").val() != null) {
        switch ($("#ResetOption").val()) {
            case "CreditCard":
                $("#divOTP").hide();
                if ($("#ResetUserType").val().toUpperCase() == "R") {
                    $("#divCreditCard").show();
                }
                $("#divCheckCard").hide();
                break;
            case "CheckCard":
                $("#divOTP").hide();
                break;
            case "SecurityQuestions":
                $("#divOTP").hide();
                if ($("#ResetUserType").val().toUpperCase() === "R") {
                    $("#divCheckCard,#divCreditCard").hide();
                } else {
                    $("#divCheckCard").hide();
                }

                $("#divOnlineBanking").show();

                break;
            case "OOB_EMAIL":
                if ($("#ResetUserType").val().toUpperCase() === "R") {
                    $("#divCheckCard,#divCreditCard").hide();
                } else {
                    $("#divCheckCard").hide();
                }
                $("#divOTP").show();
                RadioButtonSelectOTPOptions();
                break;
            case "MortgageAccount":
                $("#" + mtgAccountOptionId).click();
                $("#divCheckCard,#divCreditCard,#divOnlineBanking,#divOTP").hide();
                $("#divMtgAccount").show();
                break;
            case "BusinessCreditCard":
                $("#divCreditCard").show();
                $("#divCheckCard").hide();
                $("#divOTP").hide();
                break;
            default:
                $("#rdoPasscodeResetOption0").click();
                break;
        }

    }
    if ($("#HideCardOption").val() == "True") {
        $("#ResetOption").val("SecurityQuestions");
        $("#divCheckCard,#divCreditCard").hide();
        if ($("#Auth").val() == "Rsa") {
            GetRsaSecurityQuestions();
        }
        $("#divOnlineBanking").show();
        $("[name='RsaCredentialTypes']:checked").val('');
    }
    else if ($("#HideCreditCardOption").val() == "True") {
        $("#rdoPasscodeResetOption0").click(function () {
            $("#divCheckCard").show();
            $("#divOnlineBanking").hide();
            $("#divCreditCard").hide();
            $("#ResetOption").val("CreditCard");
            ClearCardInputFields();
            $("#divOnlineBanking,#divOTP").hide();
            $("[name='RsaCredentialTypes']:checked").val('');
        });
        $("#rdoPasscodeResetOption1").click(function () {
            $("#divOnlineBanking,#divOTP").hide();
            $("[name='RsaCredentialTypes']:checked").val('');
            $("#divCheckCard").hide();
            $("#divCreditCard").show();
            $("#ResetOption").val("BusinessCreditCard");
            ClearCardInputFields();
        });
        $("#rdoPasscodeResetOption2").click(function () {
            $("#divOnlineBanking").show();
            if ($("#Auth").val() == "Rsa") {
                GetRsaSecurityQuestions();
            }
            $("[name='RsaCredentialTypes']:checked").val('');
            $("#divCheckCard,#divOTP,#divCreditCard").hide();
            $("#divCheckCard").hide();
            ClearCardInputFields();
        });
        $("#rdoPasscodeResetOption3").click(function () {
            $("#divOTP").show();
            RadioButtonSelectOTPOptions();
            $("#divCheckCard, #divOnlineBanking").hide();
            $("#divCreditCard").hide();
            ClearCardInputFields();
        });


    } else {

        $("#rdoPasscodeResetOption0").click(function () {

            $("#divCheckCard").show();
            $("#divOTP").hide();
            if ($("#ResetUserType").val().toUpperCase() == "R") {
                $("#divCreditCard,#divOnlineBanking").hide();
            }
            ClearCardInputFields();
            $("[name='RsaCredentialTypes']:checked").val('');
        });
        $("#rdoPasscodeResetOption1").click(function () {
            $("#divCheckCard,#divOnlineBanking,#divOTP").hide();
            if ($("#ResetUserType").val().toUpperCase() === "R") {
                $("#divCreditCard").show();
            }
            ClearCardInputFields();
            $("[name='RsaCredentialTypes']:checked").val('');
        });

        $("#rdoPasscodeResetOption2").click(function () {
            if ($("#ResetUserType").val().toUpperCase() == "R") {
                $("#divCheckCard,#divCreditCard,#divOTP").hide();
            }
            if ($("#Auth").val() === "Rsa") {
                GetRsaSecurityQuestions();
                //              
            }
            $("[name='RsaCredentialTypes']:checked").val('');
            $("#divOnlineBanking").show();
            ClearCardInputFields();
        });

    }


    $("#" + mtgAccountOptionId).click(function () {
        $("#divMtgAccount").show();
        $("#divCheckCard,#divCreditCard,#divOnlineBanking,#divOTP").hide();
        ClearCardInputFields();
        $("[name='RsaCredentialTypes']:checked").val('');
    });
    $("#" + otpOptionId).click(function () {
        $("#divOTP").show();
        $("#divCheckCard,#divCreditCard,#divOnlineBanking,#divMtgAccount").hide();
        RadioButtonSelectOTPOptions();
        $("[name='RsaCredentialTypes']:checked").val('OOB_EMAIL');
    });

    $("input[type='radio'][value!='MortgageAccount']").click(function () {
        $("#divMtgAccount").hide();
    });

    function GetRsaSecurityQuestions() {
        var q1 = $("#lblSecurityQ1");
        var q2 = $("#lblSecurityQ2");

        if ($.trim(q1.val()).length === 0 || $.trim(q2.val()).length === 0) {

            $.ajax({
                url: '/login/GetRsaChallengeQuestions',
                data: { pageId: pageName },
                type: "GET",
                cache: false,
                success: function (result) {
                    q1.text(result["sq1"]);
                    q2.text(result["sq2"]);
                }

            });
        }
    }
    $("#btnStep3Cancel").click(function () {
        MTBDialogBox("Are you sure?", "divDialogConfirm", "/Login/Index");
    });

    $("#btnCancel").click(function () {
        MTBDialogBox("Are you sure?", "divDialogConfirm", "", null, null, null, function (dialogResult) {
            if (dialogResult) {
                if ($('#UserType' == 'B')) {
                    if ($("#rdoPasscodeResetOption1")[0] && $("#rdoPasscodeResetOption1")[0].checked) {
                        DummyAuthenticate();
                    }
                    window.location.href = '/Login/Index';
                } else {
                    if ($("#rdoPasscodeResetOption2")[0] && $("#rdoPasscodeResetOption2")[0].checked) {
                        DummyAuthenticate();
                    }
                    window.location.href = '/Login/Index';
                }

            }
        });
    });

    $("#btnNext").click(function (e) {
        if (!IsValidInputStep1()) {
            e.preventDefault();
        } else {
            $('#StepStage').val("Step1");
        }
    });

    $("#btnSubmit").click(function () {
        if ($("form").valid()) {
            $('#StepStage').val("Step3");
            $("form").submit();
            $('#UserType').val('');
            ChangeStep("PasscodeResetStep4", "Skip_tag");
        }
    });

    $("#btnStep2Next").click(function () {
        pinnumber = $('#DebitCardPin').val();
        if (!$("form").valid()) {
            $.each($("#divStep2 input:not([type=radio])"), function () {
                var ide = "#" + this.id;
                // ReSharper disable UnusedLocals
                var securityAnswer1 = $("SecurityAnswer1").val();
                // ReSharper restore UnusedLocals
                // ReSharper disable UnusedLocals
                var securityAnswer2 = $("SecurityAnswer2").val();
                // ReSharper restore UnusedLocals
                if (!$("form").validate().element(ide)) {
                    if (ide == "#DebitCardPin") {
                        $('#DebitCardPin').val("");
                    }
                    if (ide == "#DebitCardNumber") {
                        $('#DebitCardNumber').val("");
                    }
                    if (ide == "#CreditCardPin") {
                        $('#CreditCardPin').val("");
                    }
                    if (ide == "#CreditCardNumber") {
                        $('#CreditCardNumber').val("");
                    }
                    if (ide == "#MtgAccountNumber") {
                        $('#MtgAccountNumber').val("");
                    }
                }
            });
        }
        else {
            $('#StepStage').val("Step2");
            var selCredentialType = String($("[name='RsaCredentialTypes']:checked").val());
            if (selCredentialType !== "undefined" && selCredentialType.length != 0) {
                $('#UserType').val('');

                $.ajax({
                    url: "/Challenge/GetChallenge/",
                    data: { credentialType: selCredentialType },
                    type: "GET",
                    cache: false,
                    success: function (result) {
                        $("#TrxMonitoring").html("");
                        console.log(result);
                        $("#TrxMonitoring").prepend(result);
                        MTBLightBox("Security Confirmation", "TrxMonitoring", 520);
                    },
                    complete: function (result) {
                        // $("form").submit();
                        // ChangeStep("PasscodeResetStep3");
                    }

                });
            } else {
                $("form").submit();
                $('#UserType').val('');
            }


            ChangeStep("PasscodeResetStep3", "Skip_tag");
        }

    });

    $("#btnLogIntoOnlineBanking").click(function () {
        var marketingUrl = $("#MarketingRedirect").val();
        if (/\S/gi.test(marketingUrl)) {
            window.location.href = '/Login/MarketingRedirect/?path=' + marketingUrl;
        } else {
            window.location.href = '/Login/Index';
        }
    });

    //handle modelstate error
    if (!/true/i.test($("#ModelStateValid").val())) {
        $("#UserId,#SocialSecurityNumber").addClass("input-validation-error");
        $("#SocialSecurityNumber").val("");
    }

});

function IsValidInputStep1() {
    var isValidSsn = true;
    $('.field-validation-error,.field-validation-valid').empty();
    $('.input-validation-error').removeClass('input-validation-error').addClass('valid');
    var regex = /^(?!(0{9}|1{9}|2{9}|3{9}|4{9}|5{9}|6{9}|7{9}|8{9}|9{9}))\d{9}$/;
    var regexSpChar = /^([0-9]+)$/;
    var validator;
    validator = $("form").validate();
    if ($("#UserId").val() == "") {
        validator.showErrors({ UserId: "Please enter your User ID." });
        isValidSsn = false;
    }
    if ($("#SocialSecurityNumber").val() == "") {
        //$("#SocialSecurityNumber").val("");
        validator.showErrors({ SocialSecurityNumber: "Please enter your Social Security number/Tax Identification Number." });
        isValidSsn = false;
    }
    else if (!regexSpChar.test($("#SocialSecurityNumber").val())) {
        $("#SocialSecurityNumber").val("");
        validator.showErrors({ SocialSecurityNumber: "Your Social Security number/Tax Identification Number cannot contain special characters (including spaces). Please re-enter your Social Security number/Tax Identification Number." });
        isValidSsn = false;
    }
    else if (!regex.test($("#SocialSecurityNumber").val())) {
        $("#SocialSecurityNumber").val("");
        validator.showErrors({ SocialSecurityNumber: "Your Social Security number/Tax Identification Number must have 9 digits. Please re-enter your Social Security number/Tax Identification Number." });
        isValidSsn = false;
    }
    return isValidSsn;
}

function StepUp() {
    switch (stepIndex) {
        case 1:
            if ($('form').valid()) {
                if ($("#ResetUserType").val().toUpperCase() == "B") {
                    //$("#spOnlineBanking").show();
                }
                else {
                    $("#spMtgAccountNumber").show();
                }

                stepIndex = stepIndex + 1;
                ShowWizardStep(2, 4);
            }
            break;
        case 2:
            if ($('form').valid() && $("form")) {

                $("#divStep" + stepIndex).hide();
                stepIndex = stepIndex + 1;
                ShowWizardStep(3, 4);
                $('#UserType').val('');
                ChangeStep("PasscodeResetStep3");
                $("#divStep" + stepIndex).show();
                $("#btnSubmit").show();
                $("#btnNext").hide();
            } else {
                $("#DebitCardPin").val("");
            }
            break;
        case 3:
            if ($('form').valid()) {

                $("#divStep" + stepIndex).hide();
                stepIndex = stepIndex + 1;
                ShowWizardStep(4, 4);
                $('#UserType').val('');
                ChangeStep("PasscodeResetStep4");
                $("#divStep" + stepIndex).show();

                $(".button-section").hide();
                $(".wizard-gradient").addClass("botbord");

            } else {
                $("#NewPasscode,#ReenterPasscode").val("");
            }
            break;
    }
}

//On click on BACK button
function StepDown() {
    stepIndex = $("#StepNumber").val();

    if ($('#UserType').val() == "B") {
        if ((stepIndex == 2) && $("#rdoPasscodeResetOption1")[0] && ($("#rdoPasscodeResetOption1")[0].checked)) {
            $("#ResetOption").val("CreditCard");
            DummyAuthenticate();
        }
    } else {
        if ((stepIndex == 2) && $("#rdoPasscodeResetOption2")[0] && ($("#rdoPasscodeResetOption2")[0].checked)) {
            $("#ResetOption").val("SecurityQuestions");
            DummyAuthenticate();
        }
    }


    $('#buttonSection' + stepIndex).hide();
    $("#divStep" + stepIndex).hide();

    stepIndex = stepIndex == 3 ? stepIndex - 2 : stepIndex - 1;


    $("#StepNumber").val(stepIndex);
    $('#UserType').val('');
    ChangeStep("PasscodeResetStep" + stepIndex);
    $("#divStep" + stepIndex).show();
    $('#buttonSection' + stepIndex).show();

    if (stepIndex == 1) {
        $("#btnBack,#btnCancel,#btnSubmit").hide();
        $("#btnLogin,#btnNext").show();

        $("#DebitCardNumber,#SecurityAnswer1,#SecurityAnswer2,#lblSecurityQ1,#lblSecurityQ2,#NewPasscode,#ReenterPasscode,#MtgAccountNumber,#CreditCardNumber,#CreditCardPin").val('');

        $("#rdoPasscodeResetOption0").click();
    }
    else {
        $("#NewPasscode,#ReenterPasscode").val("");
        $("#btnBack,#btnCancel,#btnNext").show();
        $("#btnSubmit,#btnLogin").hide();
    }

    ShowWizardStep(stepIndex, 4);
}

function ClearCardInputFields() {
    $("#txtNumber,#dpFromDate,#dpToDate").val("");
    $('.field-validation-error,.field-validation-valid').empty();
    $('.input-validation-error').removeClass('input-validation-error').addClass('valid');
}

function DummyAuthenticate() {
    var theModel = {};
    theModel.ResetOption = $("#ResetOption").val();
    theModel.AuthSystem = $("#Auth").val();
    theModel.StepNumber = $("#StepNumber").val();
    theModel.StepStage = $("#StepStage").val();
    theModel.UserId = $("#UserId").val();
    theModel.UserType = $("#ResetUserType").val();
    var ts = new Date().getTime().toString();
    theModel.SecurityAnswer1 = ts;
    theModel.SecurityAnswer2 = ts;
    theModel.StepStage = "Step2";
    $.ajax({
        url: '/Login/PasscodeReset/',
        data: '{ model: ' + JSON.stringify(theModel) + '}',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "Json",
        cache: false,
        success: function () { },
        error: function () { }
    });
}


var pageName = GetPageNameTag();
function RadioButtonSelectOTPOptions() {
    var name = 'RsaCredentialTypes';
    $('input[name="' + name + '"]').prop('checked', true);
    $('input[name="' + name + '"]').parents().addClass("checked");
}

$('<input>').attr({ type: 'hidden', id: 'pageId', name: 'PageId', value: pageName }).appendTo('form');
