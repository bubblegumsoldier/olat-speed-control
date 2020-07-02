oscInitialized = false;

function getVideo() {
    return document.getElementById("MediaElement")
}

function customSpeedSwitchClicked() {
    if (getVideo().playbackRate + 0.05 > 2) {
        getVideo().playbackRate = 0.5;
    }
    getVideo().playbackRate = getVideo().playbackRate + 0.05;
    updateCustomSpeedSwitch();
}

function generateCustomSpeedSwitch() {
    let speedSwitch = $("<div></div>");
    speedSwitch.addClass("osc-speed-switch");
    speedSwitch.on("click", customSpeedSwitchClicked);
    return speedSwitch;
}

function initializeSpeed()
{
    if(oscInitialized)
    {
       return;
    }
    oscInitialized = true;
}

function updateCustomSpeedSwitch() {
    let currentSpeed = getVideo().playbackRate;
    if (!currentSpeed) {
        return;
    }
    $(".osc-speed-switch").html((Math.round(currentSpeed * 100) / 100).toString());
}

var oscObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (!mutation.addedNodes) return

        if (!$(".controlBar .alwaysControls").length || !getVideo()) {
            return
        }
        let currentSpeed = getVideo().playbackRate;
        if (!currentSpeed) {
            return;
        }
        $(".controlBar .alwaysControls").append(generateCustomSpeedSwitch());
        if($("button.rate").length)
        {
            $("button.rate").remove();
        }
        initializeSpeed();
        updateCustomSpeedSwitch();
        oscObserver.disconnect();
    })
})

oscObserver.observe(document.body, {
    childList: true
    , subtree: true
    , attributes: false
    , characterData: false
})