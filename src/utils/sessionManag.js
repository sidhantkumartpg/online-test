const sessionKey = "ONLINE_EXAM_SESSION";

export function getUserInfo() {
  const session = JSON.parse(localStorage.getItem(sessionKey));
  return session ? session["user"] : null;
}

export function getTestState() {
  const session = JSON.parse(localStorage.getItem(sessionKey));
  return session ? session["testState"] : null;
}

export function saveTestState(testState, skillLevel, isSubmitted) {
  const session = JSON.parse(localStorage.getItem(sessionKey));
  const newSession = {
    ...session,
    testState: { attempts: testState, skillLevel, isSubmitted },
  };
  localStorage.setItem(sessionKey, JSON.stringify(newSession));
}

export function cleanSession() {
  localStorage.removeItem(sessionKey);
}

export function isRegistered() {
  const sessionUnparsed = localStorage.getItem(sessionKey);

  if (sessionUnparsed) {
    try {
      return !!JSON.parse(sessionUnparsed).user;
    } catch (e) {
      console.log("Earlier session stored was corrupted");
      localStorage.removeItem(sessionKey);
      return false;
    }
  } else {
    return false;
  }
}

export function hasGivenTest() {
  const testState = getTestState();
  return testState ? testState["isSubmitted"] : false;
  // if (isRegistered()) {
  //   return JSON.parse(localStorage.getItem(sessionKey))["isSubmitted"];
  // }
}
