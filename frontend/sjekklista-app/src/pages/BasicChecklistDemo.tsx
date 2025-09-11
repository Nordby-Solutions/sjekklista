import { defineStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CustomerSection() {
  const [customer, setCustomer] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="customer">Kunde</Label>
        <Input
          type="text"
          id="customer"
          placeholder="Ola Normann"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>
      <div className="grid w-full gap-3">
        <Label htmlFor="customerAddress">Kundeadresse</Label>
        <Textarea
          placeholder="Anleggsveien 1, 1928 Drøbak"
          id="customerAddress"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="contactPerson">Kontaktperson</Label>
        <Input
          type="text"
          id="contactPerson"
          placeholder="Kari Normann"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="phoneNumber">Telefonnummer</Label>
        <Input
          type="text"
          id="phoneNumber"
          placeholder="+47 123 45 678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="emailAddress">E-postadresse</Label>
        <Input
          type="text"
          id="emailAddress"
          placeholder="kontakt@sjekklista.no"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
    </div>
  );
}

function SiteSection() {
  const [siteNumber, setSiteNumber] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [siteNotation, setSiteNotation] = useState("");

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="siteNumber">Anleggsnummer</Label>
        <Input
          type="text"
          id="siteNumber"
          placeholder="1"
          value={siteNumber}
          onChange={(e) => setSiteNumber(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="siteName">Anleggsnavn</Label>
        <Input
          type="text"
          id="siteName"
          placeholder="Stadion Arena"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
      </div>
      <div className="grid w-full gap-3">
        <Label htmlFor="siteAddress">Kundeadresse</Label>
        <Textarea
          placeholder="Anleggsveien 1, 1928 Drøbak"
          id="siteAddress"
          value={siteAddress}
          onChange={(e) => setSiteAddress(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="siteNotation">Anleggsbetegnelse</Label>
        <Input
          type="text"
          id="siteNotation"
          placeholder="Anlegg A"
          value={siteNotation}
          onChange={(e) => setSiteNotation(e.target.value)}
        />
      </div>
    </div>
  );
}

function DescriptionSection() {
  const [description, setDescription] = useState("");

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="grid w-full gap-3">
        <Label htmlFor="description">Beskrivelse</Label>
        <Textarea
          className="h-56"
          placeholder=""
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}

function CommentSummarySection() {
  const [commentSummary, setCommentSummary] = useState("");

  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="grid w-full gap-3">
        <Label htmlFor="commentSummary">Oppsummering/Kommentar</Label>
        <Textarea
          placeholder=""
          className="h-56"
          id="commentSummary"
          value={commentSummary}
          onChange={(e) => setCommentSummary(e.target.value)}
        />
      </div>
    </div>
  );
}

function CompleteSection() {
  const navi = useNavigate();

  const sendEmailClick = async () => {
    await toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: "Sender e-post..",
      success: "Sjekklista er sendt på e-post!",
      error: "Oops, kunne ikke sende e-post.",
      position: "top-center",
    });

    setTimeout(() => {
      navi("/");
    }, 2000);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      <Button onClick={async () => await sendEmailClick()}>
        Send sjekklista på e-post 📧
      </Button>
    </div>
  );
}

const { useStepper, steps, utils } = defineStepper(
  {
    id: "customer",
    title: "Kunde",
    description: "Legge inn kundeinformasjon",
  },
  {
    id: "site",
    title: "Anlegg",
    description: "Legg inn anleggsinformasjon",
  },
  {
    id: "description",
    title: "Beskrivelse",
    description: "Legg inn beskrivelse",
  },
  {
    id: "commentSummary",
    title: "Oppsummering/kommentar",
    description: "Legg inn oppsummering",
  },
  { id: "complete", title: "Ferdig", description: "Send rapport" }
);

export default function BasicChecklistDemo() {
  const stepper = useStepper();
  const currentIndex = utils.getIndex(stepper.current.id);

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">✅ Sjekklista - demo</h2>
          <span className="text-sm text-muted-foreground">
            Steg {currentIndex + 1} av {steps.length}
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        <nav aria-label="Checkout Steps" className="group">
          <ol className="flex flex-col gap-2" aria-orientation="vertical">
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    role="tab"
                    variant={index <= currentIndex ? "default" : "secondary"}
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    onClick={() => stepper.goTo(step.id)}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.title}</span>
                </li>
                <div className="flex gap-4">
                  {index < array.length - 1 && (
                    <div
                      className="flex justify-center"
                      style={{ paddingInlineStart: "1.25rem" }}
                    >
                      <Separator
                        orientation="vertical"
                        className={`w-[1px] h-full ${
                          index < currentIndex ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    </div>
                  )}
                  <div className="flex-1 my-4">
                    {stepper.current.id === step.id &&
                      stepper.switch({
                        customer: () => <CustomerSection />,
                        site: () => <SiteSection />,
                        description: () => <DescriptionSection />,
                        commentSummary: () => <CommentSummarySection />,
                        complete: () => <CompleteSection />,
                      })}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </ol>
        </nav>
      </div>

      {/* Sticky Footer Buttons */}
      <div className="px-6 py-4 border-t bg-white">
        {!stepper.isLast ? (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={stepper.prev}
              disabled={stepper.isFirst}
            >
              Forrige
            </Button>
            <Button onClick={stepper.next}>
              {stepper.isLast ? "Ferdig" : "Neste"}
            </Button>
          </div>
        ) : (
          <Button onClick={stepper.reset}>Tilbakestill</Button>
        )}
      </div>
    </div>
  );
}

// export default function BasicChecklist() {
//   const stepper = useStepper();
//   const currentIndex = utils.getIndex(stepper.current.id);

//   return (
//     <div className="space-y-6 p-6 border rounded-lg min-w-[300px] max-w-[450px] self-center m-auto">
//       <div className="flex justify-between">
//         <h2 className="text-lg font-medium">Sjekkliste - demo</h2>
//         <div className="flex items-center gap-2">
//           <span className="text-sm text-muted-foreground">
//             Steg {currentIndex + 1} of {steps.length}
//           </span>
//           <div />
//         </div>
//       </div>
//       <nav aria-label="Checkout Steps" className="group my-4">
//         <ol className="flex flex-col gap-2" aria-orientation="vertical">
//           {stepper.all.map((step, index, array) => (
//             <React.Fragment key={step.id}>
//               <li className="flex items-center gap-4 flex-shrink-0">
//                 <Button
//                   type="button"
//                   role="tab"
//                   variant={index <= currentIndex ? "default" : "secondary"}
//                   aria-current={
//                     stepper.current.id === step.id ? "step" : undefined
//                   }
//                   aria-posinset={index + 1}
//                   aria-setsize={steps.length}
//                   aria-selected={stepper.current.id === step.id}
//                   className="flex size-10 items-center justify-center rounded-full"
//                   onClick={() => stepper.goTo(step.id)}
//                 >
//                   {index + 1}
//                 </Button>
//                 <span className="text-sm font-medium">{step.title}</span>
//               </li>
//               <div className="flex gap-4">
//                 {index < array.length - 1 && (
//                   <div
//                     className="flex justify-center"
//                     style={{
//                       paddingInlineStart: "1.25rem",
//                     }}
//                   >
//                     <Separator
//                       orientation="vertical"
//                       className={`w-[1px] h-full ${
//                         index < currentIndex ? "bg-primary" : "bg-muted"
//                       }`}
//                     />
//                   </div>
//                 )}
//                 <div className="flex-1 my-4">
//                   {stepper.current.id === step.id &&
//                     stepper.switch({
//                       customer: () => <CustomerSection />,
//                       site: () => <SiteSection />,
//                       description: () => <DescriptionSection />,
//                       commentSummary: () => <CommentSummarySection />,
//                       complete: () => <CompleteSection />,
//                     })}
//                 </div>
//               </div>
//             </React.Fragment>
//           ))}
//         </ol>
//       </nav>
//       <div className="space-y-4">
//         {!stepper.isLast ? (
//           <div className="flex justify-end gap-4">
//             <Button
//               variant="secondary"
//               onClick={stepper.prev}
//               disabled={stepper.isFirst}
//             >
//               Forrige
//             </Button>
//             <Button onClick={stepper.next}>
//               {stepper.isLast ? "Ferdig" : "Neste"}
//             </Button>
//           </div>
//         ) : (
//           <Button onClick={stepper.reset}>Tilbakestill</Button>
//         )}
//       </div>
//     </div>
//   );
// }
