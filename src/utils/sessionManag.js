const sessionKey = "ONLINE_EXAM_SESSION";

export function getUserInfo() {
  const session = JSON.parse(localStorage.getItem(sessionKey));
  return session ? session["user"] : null;
}

export function getTestState() {
  const session = localStorage.getItem(sessionKey);
  return session ? session["testState"] : null;
}

export function setTestState(testState) {
  const session = JSON.parse(localStorage.getItem(sessionKey));
  const newSession = { ...session, testState: { attempts: testState } };
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
