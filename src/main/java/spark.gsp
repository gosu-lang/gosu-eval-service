
get("/", "Yep, I'm here..." )

get("/eval", \-> evalIt(Request.queryParams("script")) )

function evalIt( script : String ) : String {
  Response.header('Access-Control-Allow-Origin', '*');
  try {
    if(script == null) {
      return "No program found..."
    }
    print("Evaling... ${script.trim()}")
    if(script.trim() == "1 + 1") {
      return "3.  No wait!  2!"
    }
    if(script.contains("System")) {
      return "Be nice..."
    }
    return eval(script.trim()) as String
  } catch(e) {
    return "Exception: ${e.Message}"
  }
}
