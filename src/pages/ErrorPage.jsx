import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
const error = useRouteError();

return (
    <div className="error-page min-h-screen flex items-center justify-center">
        <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">Eeep! Sorry page not found.</h1>
            {/* <p className="text-2xl font-futura mb-8">Sorry, page not found.</p> */}
            <div className="penguin-container">
                <div className="penguin-body">
                    <div className="penguin-body-right-inside"></div>
                    <div className="penguin-body-left-inside"></div>
                    <div className="penguin-right-wing"></div>
                    <div className="penguin-left-wing"></div>
                    <div className="penguin-right-eye"></div>
                    <div className="penguin-left-eye"></div>
                    <div className="penguin-nose"></div>
                    <div className="penguin-left-foot"></div>
                    <div className="penguin-right-foot"></div>
                </div>
                <div className="shadow"></div>
            </div>
        </div>
        <style>{`
            .error-page {
                background-color: white;
                min-height: 100vh;
                padding: 10rem;
            }
            
            h1 {
                text-align: center;
                color: #333;
                font-family: futura, sans-serif;
                font-size: 60px;
            }
            
            .font-futura {
                font-family: futura, sans-serif;
                color: #333;
            }
            
            .penguin-container {
                width: 230px;
                margin: 0 auto;
                transform: scale(1.3);
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }
            
            .penguin-body {
                box-shadow: inset -20px -20px 0px rgba(0,0,0,0.1);
                background-color: #263238;
                width: 230px;
                height: 300px;
                border-top-right-radius: 50%;
                border-top-left-radius: 50%;
                border-bottom-right-radius: 40%;
                border-bottom-left-radius: 40%;
            }
            
            .penguin-body-left-inside,
            .penguin-body-right-inside {
                z-index: 2;
                position: absolute;
                width: 130px;
                height: 210px;
                border-radius: 50%;
                background-color: white;
            }
            
            .penguin-body-right-inside {
                right: 30px;
                transform: rotate(20deg);
                box-shadow: inset -5px -10px 0px rgba(0,0,0,0.1);
            }
            
            .penguin-body-left-inside {
                transform: rotate(-20deg);
                left: 30px;
            }
            
            @keyframes wave {
                0% { transform: rotate(10deg); }
                50% { transform: rotate(-50deg); }
                100% { transform: rotate(10deg); }
            }
            
            .penguin-right-wing,
            .penguin-left-wing {
                position: absolute;
                top: 130px;
                background-color: #263238;
                width: 100px;
                height: 35px;
                border-top-right-radius: 50%;
                border-bottom-right-radius: 50%;
            }
            
            .penguin-right-wing {
                transform-origin: left;
                animation: wave 1s infinite ease-in-out;
                box-shadow: inset -5px -10px 0px rgba(0,0,0,0.1);
                transform: rotate(40deg);
                right: -75px;
            }
            
            .penguin-left-wing {
                transform: rotate(130deg);
                top: 150px;
                left: -66px;
            }
            
            .penguin-right-eye,
            .penguin-left-eye {
                box-shadow: inset -3px -3px 0px rgba(0,0,0,0.3);
                top: 70px;
                z-index: 3;
                position: absolute;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background-color: #263238;
            }
            
            .penguin-right-eye {
                right: 57px;
            }
            
            .penguin-left-eye {
                left: 57px;
            }
            
            .penguin-nose {
                top: 82px;
                left: 90px;
                position: absolute;
                z-index: 3;
                width: 0;
                height: 0;
                border-left: 25px solid transparent;
                border-right: 25px solid transparent;
                border-top: 25px solid #FFC107;
                border-radius: 50%;
            }
            
            .penguin-right-foot,
            .penguin-left-foot {
                box-shadow: inset -5px -10px 0px rgba(0,0,0,0.1);
                background-color: #FFC107;
                position: absolute;
                width: 70px;
                height: 30px;
                z-index: 3;
                bottom: 0px;
                border-radius: 50%;
            }
            
            .penguin-right-foot {
                right: 5px;
            }
            
            .penguin-left-foot {
                left: 5px;
            }
            
            .shadow {
                z-index: -1;
                bottom: -10px;
                position: absolute;
                width: 250px;
                height: 40px;
                background-color: rgba(0,0,0,0.1);
                border-radius: 50%;
            }
        `}</style>
    </div>
);
}