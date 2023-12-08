<?php
    require_once ('../models/FabricanteModel.php');

    $option = isset($_REQUEST['op']) ? $_REQUEST['op'] : '';
    $objFabricante = new FabricanteModel();

    if ($option == 'getFabricantes') {
        $arrResponse = array('status' => false, 'data' => "");
        $arrFabricantes = $objFabricante->getFabricantes();

        if (!empty($arrFabricantes)) {
            $arrResponse['status'] = true;
            $arrResponse['data'] = $arrFabricantes;
        } else {
            $arrResponse['status'] = false;
        }
        echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);

        exit();
    }
?>