import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";


export const arjProtection = async (req, res, next) => {

    try{

        const descion = await aj.protect(req);

        if(descion.isDenied()){
            if(descion.reason.isRateLimit()){
                return res.status(429).json({ message:"Rate limit exceeded Try again later." });
            }

         else if(descion.reason.isBot()){

            return res.status(403).json({ message:"Bot access denied" });

        }else{

            return res.status(403).json({ message:"Access denied by security policy" });

        }
        }
         //check for spoofed bots
         if(descion.results.some(isSpoofedBot)){
            return res.status(403).json({ 
                error : "spoofed bot detected",
                message:"Malicious bot activity detected"
             });
         }

         next();

    }catch(error){
        console.error("Arcjet Protection error:", error);
        next()
    }

}