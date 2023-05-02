var inputChanged;
var answerIsCorrect = false;
var isTrxCalled = false;
var otpMaskedDisplayName = "";
var trxContinueToSpinAfterSubmit = false;
var isOTPLightBox = false;
var otpCredentialType;
var otpCurrentStep = 0;
var requestSent = false;
var trxMonitoringAnalyticsTag;
var nonNumeric = /\D/g;

// ---- START: Analytics Tagging Events
function TagEmailOption() {
    s.linkTrackVars = "pageName,channel,eVar41,prop41,eVar53,prop53,event120,eVar71,prop71,events,channel,prop45,eVar45";
    s.linkTrackEvents = s.events = "event120";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar53 = "Email";
    s.eVar45 = s.prop45 = "RadioButton";
    s.eVar71 = s.prop71 = "RadioButton";
    s.eVar41 = s.prop41 = APPID;
    s.channel = GetChannel();
    s.tl(this, "o", trxMonitoringAnalyticsTag);
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagPhoneOption() {
    s.linkTrackVars = "pageName,channel,eVar41,prop41,eVar53,prop53,event120,eVar71,prop71,events,channel,prop45,eVar45";
    s.linkTrackEvents = s.events = "event120";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar53 = "TextSMS";
    s.eVar45 = s.prop45 = "RadioButton";
    s.eVar71 = s.prop71 = "RadioButton";
    s.eVar41 = s.prop41 = APPID;
    s.channel = GetChannel();
    s.tl(this, "o", trxMonitoringAnalyticsTag);
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagDevicePushNotification() {
    s.linkTrackVars = "pageName,channel,eVar41,prop41,eVar53,prop53,event120,eVar71,prop71,events,channel,prop45,eVar45";
    s.linkTrackEvents = s.events = "event120";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar53 = "DevicePushNotification";
    s.eVar45 = s.prop45 = "RadioButton";
    s.eVar71 = s.prop71 = "RadioButton";
    s.eVar41 = s.prop41 = APPID;
    s.channel = GetChannel();
    s.tl(this, "o", trxMonitoringAnalyticsTag);
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagLightBox(analyticsTag) {
    s.linkTrackVars = "pageName,channel,eVar36,eVar41,prop36,prop41,event63";
    s.linkTrackEvents = s.events = "event63";
    s.eVar36 = s.prop36 = "LightBox";
    s.pageName = analyticsTag;
    s.eVar41 = s.prop41 = APPID;
    s.eVar27 = analyticsTag;
    s.eVar53 = analyticsTag;
    s.channel = GetChannel();
    s.tl(this, "o", analyticsTag);
    s.manageVars("clearVars", s.linkTrackEvents, 1);
}

function TagCloseButton() {
    s.linkTrackVars = "pageName,channel,eVar41,prop41,eVar53,event67";
    s.linkTrackEvents = s.events = "event67";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar41 = s.prop41 = APPID;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar53 = "CloseWithX";
    s.channel = GetChannel();
    s.tl(this, "o", trxMonitoringAnalyticsTag);
    s.manageVars("clearVars", s.linkTrackEvents, 1);
}

function TagCancelButton() {
    s.linkTrackVars = "pageName,channel,eVar41,prop41,eVar53,event67";
    s.linkTrackEvents = s.events = "event67";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar41 = s.prop41 = APPID;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar53 = "Cancel";
    s.channel = GetChannel();
    s.tl(this, "o", trxMonitoringAnalyticsTag);
    s.manageVars("clearVars", s.linkTrackEvents, 1);
}

function TagResendCodeButton() {
    s.linkTrackVars = "pageName,channel,eVar41,sProp41,eVar53,event67";
    s.linkTrackEvents = s.events = "event67";
    s.eVar41 = s.prop41 = APPID;
    s.eVar53 = "ResendCode";
    s.channel = GetChannel();
    s.tl(this, "o", trxMonitoringAnalyticsTag);
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagSubmitButton() {
    s.linkTrackVars = "pageName,channel,eVar41,sProp41,eVar53,event67";
    s.linkTrackEvents = s.events = "event67";
    s.eVar41 = s.prop41 = APPID;
    s.eVar53 = "Submit";
    s.channel = GetChannel();
    s.tl(this, "o", trxMonitoringAnalyticsTag);
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagNextButton() {
    s.linkTrackVars = "pageName,channel,eVar41,prop41,eVar53,event67";
    s.linkTrackEvents = s.events = "event67";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar53 = "Next";
    s.eVar41 = s.prop41 = APPID;
    s.channel = GetChannel();
    s.tl(this, "o", "Next");
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagCancelButton() {
    s.linkTrackVars = "pageName,channel,eVar41,prop41,eVar53,event67";
    s.linkTrackEvents = s.events = "event67";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar53 = "Cancel";
    s.eVar41 = s.prop41 = APPID;
    s.channel = GetChannel();
    s.tl(this, "o", "Cancel");
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagFieldEntry() {
    s.linkTrackVars = "eVar53,event167";
    s.linkTrackEvents = s.events = "event167";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar27 = trxMonitoringAnalyticsTag;

    switch (otpCredentialType) {
        case "1": s.eVar53 = "EmailVerificationCode";
            break;
        case "2": s.eVar53 = "SMSVerificationCode";
            break;
        case "3": s.eVar53 = "PushVerificationCode";
            break;
        default: s.eVar53 = "QuestionAnswerVerification";
    }

    s.eVar41 = s.prop41 = APPID;
    s.channel = GetChannel();
    s.tl(this, "o", "");
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagErrorMessage() { 
    s.linkTrackVars = "pageName,channel,eVar27,eVar16,event189,eVar41,prop41";
    s.linkTrackEvents = s.events = "event189";
    s.pageName = trxMonitoringAnalyticsTag;
    s.eVar27 = trxMonitoringAnalyticsTag;
    s.eVar16 = "CodeDoesntMatch";
    s.eVar41 = s.prop41 = APPID;
    s.channel = GetChannel();
    s.tl(this, "o", "CodeDoesntMatch");
    s.manageVars("clearVars", s.linkTrackVars, 1);
}

function TagOTPFocus() {
    s.events = "event170";
    s.linkTrackEvents = "event170";
    s.linkTrackVars = "events";
    s.tl(this, "o", "");
}

function TagOTPBlur() {
    s.events = "event171";
    s.linkTrackEvents = "event171";
    s.linkTrackVars = "events";
    s.tl(this, "o", "");
}
// ---- END: Analytics Tagging Events

function toggleCarrierRatesMessage() {
    var carrierRates = $("#trxOtpCarrierRates");
    var selectedOtpOption = $("[name='TrxSelectedOtpContactId']:checked");
    selectedOtpOption.attr("data-otp-credential-type") === "2" ? carrierRates.show() : carrierRates.hide();
}

function initializeLightBoxForOTP(analyticsTag) {
    isOTPLightBox = true;
    otpCurrentStep = 1;
    trxMonitoringAnalyticsTag = analyticsTag;
    TagLightBox(trxMonitoringAnalyticsTag);
    window.addEventListener("focus", TagOTPFocus);
    window.addEventListener("blur", TagOTPBlur);

    var contactListItems = $(".trxOtpContactListItem");

    if (contactListItems.length > 0) {
        for (var i = 0; i < contactListItems.length; ++i) {
            contactListItems[i].onclick = toggleCarrierRatesMessage;
        }
    }

    toggleCarrierRatesMessage();
}

function destroyOTPLightBoxListeners() {
    otpCredentialType = null;
    isOTPLightBox = false;
    otpCurrentStep = 0;
    trxMonitoringAnalyticsTag = undefined;
    window.removeEventListener("focus", TagOTPFocus);
    window.removeEventListener("blur", TagOTPBlur);
}

$(document).ready(function () {
    PreventMultipleFormSubmissions();

    $(document).on("keydown", "#TrxMonSecurityAnswer", function (e) {
        if (e.keyCode === 13) {
            event.preventDefault();
            $("#btnLBCheckAnswers").trigger("click");
            $("#btnSendOTPtoEmail").trigger("click");
            $("#btnOTPResendCode").trigger("click");
            $("#btnSubmitOTP").trigger("click");
            return false;
        }

        // Only allow numbers and non character values (e.g. backspace control + v etc).
        if (!e.ctrlKey && isOTPLightBox && e.key.length === 1 && !((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {
            e.preventDefault();
        }
    });

    $(document).on("paste", "#TrxMonSecurityAnswer", function (e) {
        if (!isOTPLightBox) {
            return true;
        }

        e.preventDefault();
        e.stopPropagation();

        var text = ((event.clipboardData || window.clipboardData).getData("text") || "").substring(0, 6);
        $("#TrxMonSecurityAnswer").val(nonNumeric.test(text) ? "" : text);
    });

    var rsaResponseType = $("#TrxMonRSAResponseType").val();

    if (rsaResponseType === "CHALLENGE") {
        $.ajax({
            url: "/Challenge/InitChallenge",
            data: {},
            type: "GET",
            cache: false,
            success: function (result) {
	            if (typeof result === "string") {
		            $("#TrxMonitoring").html("");
		            $("#TrxMonitoring").prepend(result);

		            MTBLightBox("Security Confirmation", "TrxMonitoring", 500);
	            } else if (result && typeof result === "object" && result.RedirectTo && typeof result.RedirectTo === "string") {
		            window.location.href = result.RedirectTo;
	            }
            } 
        });
    }
});

$("#btnReturntoLogin").click(function () {
    window.location.href = "/Login/Index";
});

$(document).on("click", "#btnSendOTPtoEmail", function (e) {
    e.preventDefault();
    TagNextButton();

    var selectedOtpOption = $("[name='TrxSelectedOtpContactId']:checked");

    if (selectedOtpOption.length > 0) {
        var theData = {
            credentialType: selectedOtpOption.attr("data-otp-credential-type"),
            trxSelectedOtpContactId: selectedOtpOption.attr("data-otp-contact-id")
        };

        otpMaskedDisplayName = selectedOtpOption.attr("data-otp-display-name");
        otpCredentialType = theData.credentialType;

        switch (theData.credentialType) {
            case "1": TagEmailOption();
                break;
            case "2": TagPhoneOption();
                break;
            case "3": TagDevicePushNotification();
                break;
        }

        $.ajax({
            url: "/Challenge/GetChallenge/",
            data: theData,
            type: "GET",
            cache: false,
            success: function (result) {
	            if (typeof result === "string") {
		            $("#TrxMonitoring").html("");
		            $("#TrxMonitoring").prepend(result);
		            MTBLightBox("Security Confirmation", "TrxMonitoring", 520);
		            $("#otp-contact-display-name").text(otpMaskedDisplayName);
		            otpCurrentStep = 2;
	            } else if (result && typeof result === "object" && result.RedirectTo && typeof result.RedirectTo === "string") {
		            window.location.href = result.RedirectTo;
	            }
            },
            error: function () { }
        });
    }
});

$(document).on("click", "#btnOTPResendCode", function (e) {
    e.preventDefault();
    TagResendCodeButton();
    $("#trxResendVerificationSent").hide();
    $("#TrxMonSecurityAnswer").attr('title', ''); //CLEARING THE TITLE ON CLICK OF BUTTON TO INITIALIZE THE SCREEN READER
    var trxMonSecurityAnswer = $("#TrxMonSecurityAnswer");

    if (trxMonSecurityAnswer) {
        var theModel = {
            CredentialType: trxMonSecurityAnswer.attr("data-otp-credential-type"),
            TrxSelectedOtpContactId: trxMonSecurityAnswer.attr("data-otp-contact-id"),
            TrxSelectedOtpContactDisplayName: trxMonSecurityAnswer.attr("data-otp-display-name")
        };

        $.ajax({
            url: "/Challenge/Resend/",
            data: "{ model: " + JSON.stringify(theModel) + "}",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "Json",
            cache: false,
            success: function (result) {
                if (!result.UserPassedChallenged) {
                    if ((result.RedirectTo != null) && (result.RedirectTo != "")) {
                        closeDialog();
                        window.location.href = result.RedirectTo;
                    }
                    $("#TrxMonSecurityAnswer").val("");
                    $("#trxResendVerificationSent").show();
                    $("[data-valmsg-for='TrxMonSecurityAnswer']").html("");
                }
            },
            error: function () { }
        });
    }
});

function popSpinnerAfterSubmit() {
	// This is for long running post backs to the server to prevent the user
	// from clicking all over the page while a transaction is processing.
	if (trxContinueToSpinAfterSubmit) {
		setTimeout(function () {
			$(".screen-overlay").show();
		}, 0);

		setTimeout(function () {
			$(".screen-overlay").hide();
		}, 10 * 1000);
	}
}

$(document).on("click", "#btnSubmitOTP", function (e) {
    e.preventDefault();

    $("#trxResendVerificationSent").hide();

    var securityAnswer = $("#TrxMonSecurityAnswer"),
        trxMonSecurityAnswer = securityAnswer.val(),
        credentialType = securityAnswer.attr("data-otp-credential-type"),
        theModel = {
            TrxSelectedOtpContactId: securityAnswer.attr("data-otp-contact-id"),
            TrxMonSecurityAnswer: trxMonSecurityAnswer,
            CredentialType: credentialType
        };

    TagSubmitButton();

    if (!trxMonSecurityAnswer || trxMonSecurityAnswer.length < 6) {
        var submissionType = !credentialType || credentialType === "0" ? "answer" : "code";
        $("[data-valmsg-for='TrxMonSecurityAnswer']").html("The " + submissionType + " you provided does not match our records. Please re-enter your " + submissionType + ".").addClass("field-validation-error");
        $("#TrxMonSecurityAnswer").focus();
        $("#TrxMonSecurityAnswer").attr('title', 'The' + submissionType + '  you provided does not match our records. Please re-enter your' + submissionType + '.');
        $("#TrxMonSecurityAnswer").attr('tabIndex', 0);
        return false;
    }

    if (!requestSent) {
        requestSent = true;

        $.ajax({
            url: "/Challenge/AuthenticateChallenge/",
            data: "{ model: " + JSON.stringify(theModel) + "}",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "Json",
            cache: false,
            success: function (result) {
                if (result.HasErrors) {
                    if ($("#TrxMonitoringOTPErrorMessage").length > 0) {
                        var submissionType = !credentialType || credentialType === "0" ? "answer" : "code";
                        $("#TrxMonSecurityAnswer").focus();
                        $("#TrxMonSecurityAnswer").attr('title', 'The' + submissionType + '  you provided does not match our records. Please re-enter your' + submissionType + '.');
                        $("#TrxMonSecurityAnswer").attr('tabIndex', 0);
                        TagErrorMessage();
                        reIndexTrxMonitoringLightBox();
                    }

                    if ((result.RedirectTo != null) && (result.RedirectTo != "")) {
                        $("#TrxMonitorOTPConLightBox").hide();
                        closeDialog();
                        window.location.href = result.RedirectTo;
                    }

                    $("[data-valmsg-for='TrxMonSecurityAnswer']").html(result.ErrorMessage).addClass("field-validation-error");
                    $("#TrxMonSecurityAnswer").val("");
                } else {
                    if (result.UserPassChallenge) {
                        $("#TrxMonitorOTPConLightBox").hide();
                        closeDialog();
                        popSpinnerAfterSubmit();

                        if ((result.ActionMethod != null) && (result.ActionMethod !== "")) {
                            document.forms[result.CallingForm].action = result.ActionMethod;
                            document.forms[result.CallingForm].submit();
                        } else if ($("#" + result.CallingForm + " button[type='submit']").length != 0) { //
                            $("#" + result.CallingForm + " button[type='submit']").trigger("click");
                        } else if ($("#" + result.CallingForm + " button:contains('SUBMIT')").length != 0) {
                            $("#" + result.CallingForm + " button:contains('SUBMIT')").trigger("click");
                        } else if ($("#" + result.CallingForm + " button:contains('NEXT')").length != 0) {
                            $("#" + result.CallingForm + " button:contains('NEXT')").trigger("click");
                        } else if ($("#" + result.CallingForm + " button:contains('SAVE CHANGES')").length != 0) {
                            $("#" + result.CallingForm + " button:contains('SAVE CHANGES')").trigger("click");
                        }
                    } else {
                        if ((result.RedirectTo != null) && (result.RedirectTo != "")) {
                            $("#TrxMonitorOTPConLightBox").hide();
                            closeDialog();
                            window.location.href = result.RedirectTo;
                        }
                    }
                }
                requestSent = false;
            },
            error: function () { }
        });
    }
});

$(document).on("click", "#btnLBCheckAnswers", function (e) {
    e.preventDefault();

    if (!IsValidInput()) {
        e.preventDefault();
    } else {
        var theModel = {
            TrxMonSecurityQuestion: $("#TrxMonSecurityQuestion").val(),
            TrxMonSecurityQuestionKey: $("#TrxMonSecurityQuestionKey").val(),
            TrxMonSecurityAnswer: $("#TrxMonSecurityAnswer").val(),
            CredentialType: "QUESTION"
        };

        if (!requestSent) {
            requestSent = true;

            $.ajax({
                url: "/Challenge/AuthenticateChallenge/",
                data: "{ model: " + JSON.stringify(theModel) + "}",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                datatype: "Json",
                cache: false,
                success: function (result) {
                    if (result.HasErrors) {
                        if ((result.RedirectTo != null) && (result.RedirectTo != "")) {
                            closeDialog();
                            window.location.href = result.RedirectTo;
                        }
                        $("[data-valmsg-for='TrxMonSecurityAnswer']").html(result.ErrorMessage).addClass("field-validation-error");
                        $("#TrxMonSecurityQuestion").val(result.Question);
                        $("#TrxMonSecurityQuestionKey").val(result.QuestionKey);
                        $("#TrxMonSecurityAnswer").val("");
                        $("#lblQuestion").html(result.Question);
                    } else {
                        if (result.UserPassChallenge) {
                            answerIsCorrect = true;
                            closeDialog();
                            popSpinnerAfterSubmit();

                            if ((result.ActionMethod != null) && (result.ActionMethod !== "")) {
                                document.forms[result.CallingForm].action = result.ActionMethod;
                                document.forms[result.CallingForm].submit();
                            }
                            else if ($("#" + result.CallingForm + " button[type='submit']").length != 0) { //
                                $("#" + result.CallingForm + " button[type='submit']").trigger("click");
                            }
                            else if ($("#" + result.CallingForm + " button:contains('SUBMIT')").length != 0) {
                                $("#" + result.CallingForm + " button:contains('SUBMIT')").trigger("click");
                            }
                            else if ($("#" + result.CallingForm + " button:contains('NEXT')").length != 0) {
                                $("#" + result.CallingForm + " button:contains('NEXT')").trigger("click");
                            }
                            else if ($("#" + result.CallingForm + " button:contains('SAVE CHANGES')").length != 0) {
                                inputChanged = true;
                                $("#" + result.CallingForm + " button:contains('SAVE CHANGES')").trigger("click");
                            } else if ($("#" + result.CallingForm + " button:contains('Send Code')").length != 0) {
                                $("#" + result.CallingForm + " button:contains('Send Code')").trigger("click");
                            }
                        } else {
                            if ((result.RedirectTo != null) && (result.RedirectTo != "")) {
                                closeDialog();
                                window.location.href = result.RedirectTo;
                            }
                        }
                    }
                    requestSent = false;
                },
                error: function () { }
            });
        }
    }

    isTrxCalled = true;
});

$(document).on("click", "#btnLBCancel", function () {
    var theModel = {
        TrxMonSecurityQuestion: $("#TrxMonSecurityQuestion").val(),
        TrxMonSecurityQuestionKey: $("#TrxMonSecurityQuestionKey").val(),
        CredentialType: "QUESTION"
    };

    $.ajax({
        url: "/Challenge/ChallengeCancelled",
        data: "{ model: " + JSON.stringify(theModel) + "}",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "Json",
        cache: false,
        success: function (result) {
            closeDialog();
            closeOTPDialog();

            $("#" + result.CallingForm + " button:contains('SUBMIT')").removeAttr("disabled");

            if ((result.RedirectTo != null) && (result.RedirectTo != "")) {
                window.location.href = result.RedirectTo;
            }

            if (result.CallingForm == "formPayBill") {
                $("#" + result.CallingForm + " #btnReviewBack").trigger("click");
            }
        }
    });
});

function otpStep2Cancel(skipTagCancelButton) {
    var theModel = {
        CredentialType: ($("#TrxMonSecurityAnswer") || $("[name='TrxSelectedOtpContactId']:checked")).attr("data-otp-credential-type")
    };

    if (!skipTagCancelButton) {
        TagCancelButton();
    }

    $.ajax({
        url: "/Challenge/ChallengeCancelled",
        data: "{ model: " + JSON.stringify(theModel) + "}",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "Json",
        cache: false,
        success: function (result) {
            closeOTPDialog();
            $("#TrxMonitoring").html("");
            $("#" + result.CallingForm + " button:contains('SUBMIT')").removeAttr("disabled");
            $("#" + result.CallingForm + " #TrxMonitoring").html("");
            otpMaskedDisplayName = "";

            if ((result.RedirectTo != null) && (result.RedirectTo != "")) {
                window.location.href = result.RedirectTo;
            }
        }
    });
}

function otpStep1Cancel(skipTagCancelButton) {
    $("#frmTrxLightBox").hide();

    if (!skipTagCancelButton) {
        TagCancelButton();
    }
    $.ajax({
        url: "/Challenge/ChallengeCancelled",
        data: "{ model: null}",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        datatype: "Json",
        cache: false,
        success: function () {
            closeOTPDialog();
        }
    });
}

$(document).on("click", "#btnLBOTPCancel", function () { otpStep1Cancel() });
$(document).on("click", "#btnOTPUICCancel", function () { otpStep2Cancel() });

$(document).on("click", ".ui-dialog-titlebar-close", function () {
    if (isOTPLightBox){
        TagCloseButton();

        switch (otpCurrentStep) {
            case 1:
                otpStep1Cancel(true);
                break;
            case 2:
                otpStep2Cancel(true);
                break;
            default:
                break;
        }
    } else {
        $("#btnLBCancel").trigger("click");
    }
});

var closeDialog = function () {
    $("#TrxMonitorLightBox").remove();
    $("[role='dialog']").remove();
    $("#TrxMonitoring .button-section").remove();
    destroyOTPLightBoxListeners();
};

var closeOTPDialog = function () {
    $("#TrxMonitorOTPLightBox").remove();
    $("[role='dialog']").remove();
    $("#TrxMonitoring .button-section").remove();
    destroyOTPLightBoxListeners();
};

/*---------------------------- Validation --------------------------------*/

$(document).on("keydown", "#TrxMonSecurityAnswer", function (event) {
    VerifyAlphaNumericWithSpace(event);
    HandleSpecialChars();
});

$(document).on("mousedown", "#TrxMonSecurityAnswer", function (event) {
    VerifyAlphaNumericWithSpace(event);
    HandleSpecialChars();
});

$(document).on("paste", "#TrxMonSecurityAnswer", TagFieldEntry);

function HandleSpecialChars() {
    $("#TrxMonSecurityAnswer").bind("paste", function () {
        setTimeout(function () {
            var data = $.trim($("#TrxMonSecurityAnswer").val());
            var letters = /^[0-9a-zA-Z\s]+$/; ;
            if (letters.test(data)) {
                $("#TrxMonSecurityAnswer").val(data);
                return true;
            } else {
                var credentialType = $("#TrxMonSecurityAnswer").attr("data-otp-credential-type");
                var submissionType = !credentialType || credentialType === "0" ? "answer" : "code";

                $("[data-valmsg-for='TrxMonSecurityAnswer']").html("Your " + submissionType + " cannot contain letters or special characters. Please re-enter your " + submissionType + ".").addClass("field-validation-error");
                $("#TrxMonSecurityAnswer").val("");
                return false;
            }
        });
    });
}

function IsValidInput() {
    var isValid = true;
    if ($("#TrxMonSecurityAnswer").val() == "") {
        $("[data-valmsg-for='TrxMonSecurityAnswer']").html("Please enter your Answer.").addClass("field-validation-error");
        isValid = false;
    }
    return isValid;
}
/*----------------------------End Validation --------------------------------*/
