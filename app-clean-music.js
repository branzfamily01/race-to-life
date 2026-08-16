// Simplified public-domain Offenbach Can-Can melody synthesized in app.
const CAN_NOTES=[659,659,659,784,880,880,784,659,587,587,587,659,784,784,659,587,523,523,523,587,659,659,587,523,494,494,494,523,587,587,523,494];
function startCanCan(){stopCanCan();let i=0;function play(){let f=CAN_NOTES[i++%CAN_NOTES.length];tone(f,.12,'triangle',.20);if(i%4===0)tone(f/2,.10,'triangle',.12);canCanTimer=setTimeout(play,155)}play()}
function stopCanCan(){clearTimeout(canCanTimer);canCanTimer=null}
