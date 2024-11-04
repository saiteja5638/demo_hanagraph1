
let cds = require('@sap/cds');
const { DELETE } = require('@sap/cds/lib/ql/cds-ql');
module.exports = async srv => {
  srv.on('GraphPost', async (req, res) => {
    try {
      const tx = cds.transaction(req);

      if (req.data.FLAG == "SPOA") {

        let res_response = JSON.parse(req.data.Data);

        const result = await tx.run(
          `CALL "DEMO_HANAGRAPH1_HDI_DEMO_HANAGRAPH1_DB_DEPLOYER_1"."SPOA"(
            I_STARTVERTEX => ?,
            I_DIRECTION => ?,
            O_VERTICES => ?,
            O_EDGES => ?
          )`,

          [res_response.ID, res_response.DIRECTION]
        );

        return result
      }
      if (req.data.FLAG == "BFS") {
        let res_response = JSON.parse(req.data.Data);

        let BFS_query = `CALL "DEMO_HANAGRAPH1_HDI_DEMO_HANAGRAPH1_DB_DEPLOYER_1"."GS_BREADTH_FIRST_SEARCH"(
              I_STARTVERTEX => ?,
              I_DIR => ?,
              I_MAXDEPTH => ?,
              O_VERTICES => ?,
              O_EDGES => ?
            )`
        const result = await tx.run(BFS_query, [res_response.STARTV, res_response.DIRECTION, res_response.MAXDEPTH])
        return result
      }
      if (req.data.FLAG == "DFS") {
        let res_response = JSON.parse(req.data.Data);

        let DFS_query = `CALL "DEMO_HANAGRAPH1_HDI_DEMO_HANAGRAPH1_DB_DEPLOYER_1"."GS_DEPTH_FIRST_SEARCH"(I_STARTVERTEX => ?,O_VERTICES => ?)`

        const result = await tx.run(DFS_query, [res_response.STARTV])

        return result
      }
      if (req.data.FLAG == "TOPOSORT") {
        let TOPOSORT_query = `CALL "DEMO_HANAGRAPH1_HDI_DEMO_HANAGRAPH1_DB_DEPLOYER_1"."GS_TOPOLOGICAL_SORT"(O_VERTICES => ?,O_ISSORTABLE => ?)`

        const result = await tx.run(TOPOSORT_query)

        return result
      }
      if (req.data.FLAG == "NEIGHBORS") {
        let res_response = JSON.parse(req.data.Data);
        let NEIGHBORS_query = `CALL "DEMO_HANAGRAPH1_HDI_DEMO_HANAGRAPH1_DB_DEPLOYER_1"."GS_NEIGHBORS"(
            I_STARTVERTEX => ?,
            I_MINDEPTH => ?,
            I_MAXDEPTH => ?,
            I_DIR => ?,
            O_VERTICES => ?,
            O_VERTICESCOUNT => ?,
            O_EDGES => ?
          )`

        const result = await tx.run(NEIGHBORS_query, [res_response.STARTV, res_response.I_MINDEPTH, res_response.I_MAXDEPTH, res_response.DIRECTION])
        return result
      }
      if (req.data.FLAG == "KSPOA") {
        let res_response = JSON.parse(req.data.Data);

        let KSPOA_query = `CALL "DEMO_HANAGRAPH1_HDI_DEMO_HANAGRAPH1_DB_DEPLOYER_1"."GS_K_SHORT_PATH"(
            I_STARTVERTEX => ?,
            I_ENDVERTEX => ?,
            I_K => ?,
            O_PATHS => ?
          )`

        const result = await tx.run(KSPOA_query, [res_response.STARTV, res_response.END, res_response.I_K])

        return result
      }

    } catch (error) {
      console.log(error)
    }

  })
  srv.on('ExcelUpload', async (req, res) => {

    let data = req.data;
    try {

      await cds.run(DELETE.from("DEMO_HG_EDGES"))
      await cds.run(DELETE.from("DEMO_HG_NODES1"))


      if (data.FLAG == "VERTICES") {
        let parsedData = JSON.parse(data.Data)

        parsedData.forEach(async element => {
          let post_call = await cds.run(INSERT.into("DEMO_HG_NODES1").entries(element))
          console.log(post_call)
        });

      }
      if (data.FLAG == "EDGES") {
        let parsedData = JSON.parse(data.Data)

        parsedData.forEach(async element => {
          let post_call1 = await cds.run(INSERT.into("DEMO_HG_EDGES").entries(element))
          console.log(post_call1)
        });

      }


    } catch (error) {
      console.log(error)
    }

  })
}