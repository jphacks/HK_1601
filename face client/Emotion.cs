using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FaceTest
{
    class Emotion
    {
        internal async Task<string> SendPictureAsync(Stream image)
        {
            WebRequest req = WebRequest.Create("https://api.projectoxford.ai/emotion/v1.0/recognize");
            //メソッドにPOSTを指定
            req.Method = "POST";
            req.ContentType = "application/octet-stream";
            req.ContentLength = image.Length;
            req.Headers.Add("Ocp-Apim-Subscription-Key", "2788fce8a4b945e89c5be5a61e996791");

            using (var rs = await req.GetRequestStreamAsync())
            {
                await image.CopyToAsync(rs);

                //サーバーからの応答を受信するためのWebResponseを取得
                using (var res = await req.GetResponseAsync())
                {
                    //応答データを受信するためのStreamを取得
                    Stream resStream = res.GetResponseStream();
                    //受信して返却
                    using (var sr = new StreamReader(resStream))
                    {
                        return await sr.ReadToEndAsync();
                    }
                }
            }
        }

        internal async Task SendResultServer(string json)
        {
            var data = Encoding.ASCII.GetBytes(json);
            WebRequest req = WebRequest.Create("https://localhost/api/v1/face");
            req.Method = "POST";
            req.ContentType = "application/json";
            req.ContentLength = data.Length;

            using (var rs = await req.GetRequestStreamAsync())
            {
                await rs.WriteAsync(data, 0, data.Length);

                //サーバーからの応答を受信するためのWebResponseを取得
                using (var res = await req.GetResponseAsync())
                {
                }
            }
        }
    }
}
