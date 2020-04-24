# OCDS-keyword-analyzer-api
An API for keyword analysis of open contracting data from various sources.

**GET OCDS release packages from source**
----
  An API for keyword analysis of open contracting data from various sources.

* **URL**

  /:service/keywords

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    The service parameter specifies what source to retreive OCDS release packages from.

   `service=[string]`

   Avaliable sources:
    contractfinder: www.contractsfinder.service.gov.uk

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** 
    { 
      service: SELECTED SERVICE,
      search: [TRUE / FALSE],
      message: "Successfully retreived source",
      data: {
        contracts: [
          {
            ocid: UNIQUE IDENTIFIER THAT IDENTIFIES THE UNQIUE OPEN CONTRACTING PROCESS,
            uri: URI OF OCD,
            title: TITLE OF OCD,
            description: DESCRIPTION OF OCD,
            primaryKeywords: [
              ARRAY OF KEYWORDS FROM TITLE AND CLASSIFICATION
            ],
            secondaryKeywords: [
              ARRAY OF KEYWORDS FROM DESCRIPTION
            ]
          }
        ]
      }
    }
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `No response received from service: SERVICE`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Response from service: RESPONSE FROM SERVICE`

* **Sample Call:**

  https://ocds-keyword-analyzer.herokuapp.com/contractfinder/keywords
