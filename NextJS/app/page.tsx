// "use client";

import Header from "@/app/components/header/page";
import Footer from "@/app/components/footer/page";



const css = `
  body {
    background-image: url('/img.jpg');
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
  }
  
`;



export default function Home() {

  return (
    <>
      <div>
        <Header />
        <div>
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="max-w-5xl w-full text-center mb-8">
              <h1 className="text-7xl text-black font-bold text-left text-center lg:text-left">
                University <br />
                Management <br />
                System
              </h1>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
