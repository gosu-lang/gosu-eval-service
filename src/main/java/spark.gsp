uses java.lang.*
uses java.io.*

get("/", "Yep, I'm here..." )

get("/eval", \-> evalIt(Request.queryParams("script")) )

function evalIt( script : String ) : String {
  Response.header('Access-Control-Allow-Origin', '*');
  var originalOut = System.out
  try {
    if(script == null) {
      return "No program found..."
    }
    print("Evaling... ${script.trim()}")
    if(script.trim() == "") {
      return "Please enter some text..."
    }
    if(script.trim() == "1 + 1") {
      return "3.  No wait!  2!"
    }
    if(script.contains("System")) {
      return "Be nice..."
    }

    var tmpOut = new ByteArrayOutputStream()

    System.setOut(new PrintStream(tmpOut, true))

    var evalResult = eval(script.trim()) as String

    return "${tmpOut} ${evalResult == null ? "" : evalResult}"
  } catch(e) {
    return "Exception: ${e.Message}"
  } finally {
    System.setOut(originalOut)
  }
}
