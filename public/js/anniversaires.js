const date = new Date();

import { init } from "emailjs-com";

const today =
  date.getDate().toString() + " " + (date.getMonth() + 1).toString();

(function () {
  init("user_wLxdF6iNzWGc5Z43gXKiZ");
})();

var templateParams = {
  name: "James",
};

if (today == "15 3") {
  emailjs.send(service_372foy7, template_esbvazo, templateParams).then(
    function (response) {
      console.log("SUCCESS!", response.status, response.text);
    },
    function (error) {
      console.log("FAILED...", error);
    }
  );
}
