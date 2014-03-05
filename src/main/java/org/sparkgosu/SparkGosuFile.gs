package org.sparkgosu

uses spark.*
uses java.lang.*
uses java.util.Map
uses java.util.AbstractMap

class SparkGosuFile {

  static var _REQUEST = new ThreadLocal<Request>()
  static var _RESPONSE = new ThreadLocal<Response>()

  //===================================================================
  //  Utility Properties
  //===================================================================
  property get Request() : Request {
    return _REQUEST.get();
  }

  property get Response() : Response {
    return _RESPONSE.get();
  }

  function routeParam(name : String) : String {
    return Request.params(name)
  }

  function queryParam(name : String) : String {
    var val = Request.queryParams(name)
    if(val != null) {
      return val
    } else {
      return ifNull
    }
  }

  construct(){
    // Look for a PORT environment variable
    var port = System.getenv("PORT");
    if (port != null) {
      Spark.setPort(Integer.parseInt(port))
    }
  }

  //===================================================================
  //  HTTP Verbs
  //===================================================================
  function get(path : String, handler: Object ) {
    Spark.get(makeRoute(path, handler))
  }

  function post(path : String, handler: Object ) {
    Spark.post(makeRoute(path, handler))
  }

  function put(path : String, handler: Object ) {
    Spark.put(makeRoute(path, handler))
  }

  function patch(path : String, handler: Object ) {
    Spark.patch(makeRoute(path, handler))
  }

  function delete(path : String, handler: Object ) {
    Spark.delete(makeRoute(path, handler))
  }

  function head(path : String, handler: Object ) {
    Spark.head(makeRoute(path, handler))
  }

  function trace(path : String, handler: Object ) {
    Spark.trace(makeRoute(path, handler))
  }

  function connect(path : String, handler: Object ) {
    Spark.connect(makeRoute(path, handler))
  }

  function options(path : String, handler: Object ) {
    Spark.options(makeRoute(path, handler))
  }

  private function sparkGosuWrapper(request: Request, response: Response, body : block():String) : String {
    _REQUEST.set(request);
    _RESPONSE.set(response);
    try
    {
      return body();
    }
    finally
    {
      _REQUEST.set(null);
      _RESPONSE.set(null);
    }
  }

  private function makeRoute(path : String, handler: Object) : Route {

    if(handler typeis block():String) {
      var tmp = handler as block():String
      return new(path) {
        override function handle(request: Request, response: Response) : String {
          return sparkGosuWrapper(request, response, tmp);
        }
      }
    }

    return new(path) {
      override function handle(request: Request, response: Response) : String {
          return sparkGosuWrapper(request, response, \-> handler.toString());
      }
    }
  }

}