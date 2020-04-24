# OCDS-keyword-analyzer-api
An API for keyword analysis of open contracting data from various sources using the Latent Dirichlet allocation(LDS) algorithm.

**GET OCDS release packages from source**
----
  Searches for published notice OCDS releases packages with keyword analysis.

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
    ```
    {
      service: SELECTED SERVICE, 
      search: false, 
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
        ],
        rejectedKeywords: [
          ARRAY OF REJECTED KEYWORDS
        ]
      } 
    } 
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `No response received from service: SERVICE`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Response from service: RESPONSE FROM SERVICE`

* **Sample Call:**

  https://ocds-keyword-analyzer.herokuapp.com/contractfinder/keywords


**GET OCDS release packages from source with search**
----
  Searches for published notice OCDS releases package with search criteria and keyword analysis.

* **URL**

  /:service/search/keywords/?publishedFrom={publishedFrom}&publishedTo={publishedTo}&page={page}&size={size}&orderBy={orderBy}&order={order}&stages={stages}

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    The service parameter specifies what source to retreive OCDS release packages from.

   `service=[string]`

   Avaliable sources:
    contractfinder: www.contractsfinder.service.gov.uk

    **Optional:** <br />
    `publishedFrom=[ISO 8601]` Set the Publised From property. <br />
    `publishedTo=[ISO 8601]` 	Set the Publised To property. <br />
    `stages=[planning,tender,award,implementation]` Set the Stages property. <br />
    `orderBy=[publishedDate]` Set the Order By property <br />
    `order=[ASC,DESC]` 	Set the Order property. <br />
    `size=[integer]` 	Sets the maximum size of the results 0-100. <br />
    `page=[integer]` 	Sets the page of the result set to retrieve. <br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      service: SELECTED SERVICE, 
      search: true, 
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
        ],
        rejectedKeywords: [
          ARRAY OF REJECTED KEYWORDS
        ]
      } 
    } 
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `No response received from service: SERVICE`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `Response from service: RESPONSE FROM SERVICE`

* **Sample Call:**

  https://ocds-keyword-analyzer.herokuapp.com/contractfinder/search/keywords?size=10

