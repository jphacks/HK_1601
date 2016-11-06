using OpenCvSharp;
using System;
using System.IO;

namespace FaceTest
{
    class Program
    {
        static void Main(string[] args)
        {
            var emotion = new Emotion();

            //CreateCameraCaptureの引数はカメラのIndex(通常は0から始まる)
            Restart:
            using (var capture = Cv.CreateCameraCapture(0))
            {
                IplImage frame;// = new IplImage();

                //  W320 x H240のウィンドウを作る
                double w = 320, h = 240;
                Cv.SetCaptureProperty(capture, CaptureProperty.FrameWidth, w);
                Cv.SetCaptureProperty(capture, CaptureProperty.FrameHeight, h);

                //  何かキーを押すまでは、Webカメラの画像を表示し続ける
                //Task.Delay(500).Wait();
                Console.WriteLine("いずれかのキーを入力すると終了します。\n");

                NextScan:
                //  カメラからフレームを取得
                int miss = 0;
                while ((frame = Cv.QueryFrame(capture)) == null)
                {
                    if (Console.KeyAvailable)
                        return;
                    //Task.Delay(500).Wait();
                    if (++miss > 2)
                        goto Restart;
                }

                //  Window「Capture」を作って、Webカメラの画像を表示
                Cv.ShowImage("Capture", frame);

                string face;
                using (var image = new MemoryStream())
                {
                    frame.ToStream(image, ".png");
                    image.Position = 0L;

                    face = emotion.SendPictureAsync(image).Result;
                }

                Console.WriteLine();
                Console.WriteLine(face.Replace(",", ",\n").Replace("{","{\n"));
                //閉じる
                if (Cv.WaitKey(5000) == -1 && !Console.KeyAvailable)
                {
                    goto NextScan;
                }

                //  bmp以外にも、jpegやpngでの保存が可能
                //frame.SaveImage("result.bmp");

                //  使い終わったWindow「Capture」を破棄
                Cv.DestroyWindow("Capture");
            }
        }
    }
}
