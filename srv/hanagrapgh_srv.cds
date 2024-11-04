using demo_hg from  '../db/hanagraph';

 
service hanagraphs {

    entity edges        as projection on demo_hg.edges;
    entity nodes        as projection on demo_hg.nodes1;
    // entity vertices_new as projection on demo_hg.vertices_new;
    // entity edges_new as projection on demo_hg.edges_new;
    
    function GraphPost(FLAG : String, Data : String)   returns String;
    function ExcelUpload(FLAG : String, Data : String) returns String;
}
