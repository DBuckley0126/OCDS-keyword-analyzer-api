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

  * **Code:** 200 <br />
    **Content:** 
    { <br />
      service: SELECTED SERVICE, <br />
      search: [TRUE / FALSE], <br />
      message: "Successfully retreived source", <br />
      data: { <br />
        contracts: [ <br />
          { <br />
            ocid: UNIQUE IDENTIFIER THAT IDENTIFIES THE UNQIUE OPEN CONTRACTING PROCESS, <br />
            uri: URI OF OCD, <br />
            title: TITLE OF OCD, <br />
            description: DESCRIPTION OF OCD, <br />
            primaryKeywords: [ <br />
              ARRAY OF KEYWORDS FROM TITLE AND CLASSIFICATION <br />
            ], <br />
            secondaryKeywords: [ <br />
              ARRAY OF KEYWORDS FROM DESCRIPTION <br />
            ] <br />
          } <br />
        ] <br />
      } <br />
    } <br />
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `No response received from service: SERVICE`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Response from service: RESPONSE FROM SERVICE`

* **Sample Call:**

  https://ocds-keyword-analyzer.herokuapp.com/contractfinder/keywords
