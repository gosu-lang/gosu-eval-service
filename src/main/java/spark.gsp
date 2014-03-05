
get("/", "Yep, I'm here..." )

get("/eval", \-> evalIt(Request.queryParams("script")) )

function evalIt( script : String ) : String {
  try {
    print("Evaling... ${script}")
    if(script.contains("System")) {
      return "Be nice..."
    }
    return eval(script) as String
  } catch(e) {
    return "Exception: ${e.Message}"
  }
}
