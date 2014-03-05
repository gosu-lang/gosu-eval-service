package org.sparkgosu;

import gw.config.CommonServices;
import gw.lang.Gosu;
import gw.lang.parser.*;
import gw.lang.parser.exceptions.ParseResultsException;
import gw.lang.reflect.IType;
import gw.lang.reflect.TypeSystem;
import gw.lang.reflect.gs.IGosuProgram;
import gw.lang.reflect.gs.IProgramInstance;
import gw.util.GosuExceptionUtil;
import gw.util.StreamUtil;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.List;

public class Init
{
    public static void main( String[] args )
    {
      Gosu.init();
      try {
        URL resource = Init.class.getResource("/spark.gsp");
        String content = new String(StreamUtil.getContent(resource.openStream()));
        IGosuProgramParser programParser = GosuParserFactory.createProgramParser();
        List<String> packages = Arrays.asList("org.sparkgosu");
        ITypeUsesMap typeUses = CommonServices.getGosuIndustrialPark().createTypeUsesMap(packages);
        for( String aPackage : packages )
        {
          typeUses.addToDefaultTypeUses( aPackage );
        }
        IType supertype = TypeSystem.getByFullName("org.sparkgosu.SparkGosuFile");
        ParserOptions options = new ParserOptions().withTypeUsesMap(typeUses).withSuperType(supertype);
        IParseResult result = programParser.parseExpressionOrProgram( content, new StandardSymbolTable( true ), options );
        IGosuProgram program = result.getProgram();
        IProgramInstance instance = program.getProgramInstance();
        instance.evaluate(null);
      } catch (IOException e) {
        throw GosuExceptionUtil.forceThrow(e);
      } catch (ParseResultsException e) {
        throw GosuExceptionUtil.forceThrow(e);
      }
    }
}
