const getCorsHeaders = (origin) => {
      // Default options
      let headers = {
        "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
        "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
        "Access-Control-Allow-Credentials": "true"
      };
    
      // If no allowed origin is set to default server origin
      if (!process.env.ALLOWED_ORIGIN || !origin) return headers;
    
      // If allowed origin is set, check if origin is in allowed origins
      const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");
    
      // Validate server origin
      if (allowedOrigins.includes("*")) {
        headers["Access-Control-Allow-Origin"] = "*";
      } else if (allowedOrigins.includes(origin)) {
        headers["Access-Control-Allow-Origin"] = origin;
      }
    
      // Return result
      return headers;
    };

export default getCorsHeaders;