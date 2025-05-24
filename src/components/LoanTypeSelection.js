// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from './ui/button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoins, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';

// const LoanTypeSelection = () => {
//   const navigate = useNavigate();

//   const handleLoanTypeSelect = (loanType, scheme) => {
//     navigate('/search-members', {
//       state: {
//         loanType,
//         scheme
//       }
//     });
//   };

//   // Add these styles to your CSS file or use a CSS-in-JS solution
//   const styles = `
//     .container {
//       position: relative;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       flex-wrap: wrap;
//       gap: 2rem;
//     }

//     .glass-card {
//       position: relative;
//       width: 320px;
//       height: 420px;
//       background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
//       border: 1px solid rgba(0, 0, 100, 0.1);
//       box-shadow: 0 10px 20px rgba(0, 0, 100, 0.1);
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: center;
//       transition: all 1s ease;
//       border-radius: 10px;
//       margin: 0;
//       backdrop-filter: blur(5px);
//       transform: rotate(calc(var(--r) * 1deg));
//       padding: 1.5rem;
//       color: #1a237e;
//     }

//     .glass-card:hover {
//       transform: rotate(0deg) scale(1.03);
//       box-shadow: 0 15px 30px rgba(0, 0, 100, 0.2);
//       animation: shake 0.5s;
//     }

//     // @keyframes shake {
//     //   0%, 100% { transform: rotate(0deg) scale(1.03); }
//     //   20%, 60% { transform: rotate(-2deg) scale(1.03); }
//     //   40%, 80% { transform: rotate(2deg) scale(1.03); }
//     // }

//     .glass-footer {
//       position: absolute;
//       bottom: 0;
//       width: 100%;
//       height: 40px;
//       background: rgba(26, 35, 126, 0.1);
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       color: #1a237e;
//       border-bottom-left-radius: 10px;
//       border-bottom-right-radius: 10px;
//       font-weight: 600;
//       font-size: 1.2rem;
//     }

//     .glass-footer::before {
//       content: attr(data-text);
//     }

//     .loan-icon {
//       font-size: 4rem;
//       margin-bottom: 1rem;
//       color: #1a237e;
//     }

//     .loan-title {
//       color: #1a237e;
//       font-weight: 700;
//       font-size: 1.8rem;
//       margin-bottom: 0.5rem;
//       text-align: center;
//     }

//     .loan-description {
//       color: #455a64;
//       font-size: 1.2rem;
//       margin-bottom: 1.5rem;
//       text-align: center;
//     }

//     .scheme-buttons {
//       width: 100%;
//       display: flex;
//       flex-direction: column;
//       gap: 0.7rem;
//       margin-top: 1rem;
//     }

//     .scheme-button {
//       font-size: 1.1rem;
//       padding: 0.8rem;
//     }
//   `;

//   // Add the styles to your document
//   React.useEffect(() => {
//     const styleElement = document.createElement('style');
//     styleElement.innerHTML = styles;
//     document.head.appendChild(styleElement);
//     return () => {
//       document.head.removeChild(styleElement);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
//       <div className="w-full max-w-6xl mb-8 px-4">
//         <h1 className="text-3xl font-bold text-[#1a237e] mb-2">Select Loan Type</h1>
//         <p className="text-lg text-[#455a64]">Choose the type of loan you want to process</p>
//       </div>

//       <div className="container">
//         {/* Gold Loan Card */}
//         <div className="glass-card" style={{ "--r": "-10" }}>
//           <div className="flex flex-col items-center w-full">
//             <FontAwesomeIcon icon={faCoins} className="loan-icon" />
//             <h2 className="loan-title">Gold Loan</h2>
//             <p className="loan-description">Secure loans against gold assets</p>

//             <div className="scheme-buttons">
//               <Button
//                 variant="outline"
//                 className="w-full justify-start bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border-[#1a237e]/30 hover:border-[#1a237e]/40 scheme-button"
//                 onClick={() => handleLoanTypeSelect('Gold Loan', 'Standard')}
//               >
//                 Standard Gold Loan
//               </Button>
//             </div>
//           </div>
//           <div className="glass-footer" data-text="Gold Loan"></div>
//         </div>

//         {/* Business Loan Card */}
//         <div className="glass-card" style={{ "--r": "5" }}>
//           <div className="flex flex-col items-center w-full">
//             <FontAwesomeIcon icon={faBriefcase} className="loan-icon" />
//             <h2 className="loan-title">Business Loan</h2>
//             <p className="loan-description">Finance for business growth</p>

//             <div className="scheme-buttons">
//               {[1, 2, 3, 4, 5].map((scheme) => (
//                 <Button
//                   key={scheme}
//                   variant="outline"
//                   className="w-full justify-start bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border-[#1a237e]/30 hover:border-[#1a237e]/40 scheme-button"
//                   onClick={() => handleLoanTypeSelect('Business Loan', `Scheme ${scheme}`)}
//                 >
//                   Scheme {scheme}
//                 </Button>
//               ))}
//             </div>
//           </div>
//           <div className="glass-footer" data-text="Business Loan"></div>
//         </div>

//         {/* Lendbox Loan Card */}
//         <div className="glass-card" style={{ "--r": "15" }}>
//           <div className="flex flex-col items-center w-full">
//             <FontAwesomeIcon icon={faUser} className="loan-icon" />
//             <h2 className="loan-title">Lendbox Loan</h2>
//             <p className="loan-description">Quick personal loans</p>

//             <div className="scheme-buttons">
//               {[
//                 { id: 1, name: "Personal Loan" },
//                 { id: 2, name: "Weekly Loan" },
//                 { id: 3, name: "Scheme 2" }
//               ].map((scheme) => (
//                 <Button
//                   key={scheme.id}
//                   variant="outline"
//                   className="w-full justify-start bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border-[#1a237e]/30 hover:border-[#1a237e]/40 scheme-button"
//                   onClick={() => handleLoanTypeSelect('Lendbox Loan', scheme.name)}
//                 >
//                   {scheme.name}
//                 </Button>
//               ))}
//             </div>
//           </div>
//           <div className="glass-footer" data-text="Lendbox Loan"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoanTypeSelection;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faBriefcase, faUser } from '@fortawesome/free-solid-svg-icons';

const LoanTypeSelection = () => {
  const navigate = useNavigate();

  const handleLoanTypeSelect = (loanType, scheme) => {
    navigate('/search-members', {
      state: {
        loanType,
        scheme
      }
    });
  };

  // Add these styles to your CSS file or use a CSS-in-JS solution
  const styles = `
    .container {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: stretch;
      flex-wrap: wrap;
      gap: 2rem;
    }

    .glass-card {
      position: relative;
      width: 320px;
      height: 420px;
      background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
      border: 1px solid rgba(0, 0, 100, 0.1);
      box-shadow: 0 10px 20px rgba(0, 0, 100, 0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      transition: 0.5s;
      border-radius: 10px;
      margin: 0;
      backdrop-filter: blur(5px);
      padding: 1.5rem;
      color: #1a237e;
    }

    .glass-card:hover {
      transform: scale(1.02);
      box-shadow: 0 15px 30px rgba(0, 0, 100, 0.15);
    }

    .glass-footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: rgba(26, 35, 126, 0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #1a237e;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .glass-footer::before {
      content: attr(data-text);
    }

    .loan-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      color: #1a237e;
    }

    .loan-title {
      color: #1a237e;
      font-weight: 600;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }

    .loan-description {
      color: #455a64;
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .scheme-buttons {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      margin-top: 1rem;
    }
  `;

  // Add the styles to your document
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-6xl mb-8 px-4">
        <h1 className="text-3xl font-bold text-[#1a237e] mb-2">Select Loan Type</h1>
        <p className="text-lg text-[#455a64]">Choose the type of loan you want to process</p>
      </div>

      <div className="container">
        {/* Gold Loan Card */}
        <div className="glass-card">
          <div className="flex flex-col items-center w-full">
            <FontAwesomeIcon icon={faCoins} className="loan-icon" />
            <h2 className="loan-title">Gold Loan</h2>
            <p className="loan-description">Secure loans against gold assets</p>

            <div className="scheme-buttons">
              <Button
                variant="outline"
                className="w-full justify-start bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border-[#1a237e]/30 hover:border-[#1a237e]/40 text-lg py-3"
                onClick={() => handleLoanTypeSelect('Gold Loan', 'Standard')}
              >
                Standard Gold Loan
              </Button>
              
            </div>
          </div>
          <div className="glass-footer" data-text="Gold Loan"></div>
        </div>

        {/* Business Loan Card */}
        <div className="glass-card">
          <div className="flex flex-col items-center w-full">
            <FontAwesomeIcon icon={faBriefcase} className="loan-icon" />
            <h2 className="loan-title">Business Loan</h2>
            <p className="loan-description">Finance for business growth</p>

            <div className="scheme-buttons">
              {[1, 2, 3, 4, 5].map((scheme) => (
                <Button
                  key={scheme}
                  variant="outline"
                  className="w-full justify-start bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border-[#1a237e]/30 hover:border-[#1a237e]/40 text-lg py-3"
                  onClick={() => handleLoanTypeSelect('Business Loan', scheme)}
                >
                  Scheme {scheme}
                </Button>
              ))}
            </div>
          </div>
          <div className="glass-footer" data-text="Business Loan"></div>
        </div>

        {/* Lendbox Loan Card */}
        <div className="glass-card">
          <div className="flex flex-col items-center w-full">
            <FontAwesomeIcon icon={faUser} className="loan-icon" />
            <h2 className="loan-title">Lendbox Loan</h2>
            <p className="loan-description">Quick personal loans</p>

            <div className="scheme-buttons">
              {[
                { id: 1, name: "Personal Loan" },
                { id: 2, name: "Weekly Loan" },
                { id: 3, name: "Scheme 2" }
              ].map((scheme) => (
                <Button
                  key={scheme.id}
                  variant="outline"
                  className="w-full justify-start bg-[#1a237e]/10 hover:bg-[#1a237e]/20 text-[#1a237e] border-[#1a237e]/30 hover:border-[#1a237e]/40 text-lg py-3"
                  onClick={() => handleLoanTypeSelect('Lendbox Loan', scheme.id)}
                >
                  {scheme.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="glass-footer" data-text="Lendbox Loan"></div>
        </div>
      </div>
    </div>
  );
};

export default LoanTypeSelection;
