myApp.controller('actionFormController', ['$scope', 'Api', function($scope, Api){
    $scope.form = {};
    $scope.actions = [];
    $scope.pageSize = 5;
    $scope.currentPage = 1;
    $scope.username = "";
    // $scope.FBLoginStatus();
    // Api.Action.query({}, function(data){
    //     $scope.actions = data;
    // });
    
    // $scopr.init = function(){
    //     $scope.FBLoginStatus();
    // };
    
    $scope.editable = function(action){
        console.log(action);
        action["editable"] = true;
        console.log(action);
        
        $scope.actions.forEach(function(act){
           delete act["editable"];
        });
        
        $scope.form.id = action._id;
        $scope.form.type = action.type;
        $scope.form.amount = Number(action.amount);
        $scope.form.tag = action.tag;
        $scope.form.discript = action.discript;
        $scope.form.account = action.account;
        $scope.form.date = new Date(action.date);
        $scope.form.username = action.username;
        $scope.form.active = action.active;
        // console.log($scope.actions[action]);
        // $scope.actions[action]["editable"] = true;
        // console.log($scope.actions[action]["editable"]);
    }

    
    $scope.getActions = function(username){
        console.log(username);
        console.log($scope.actions);
        // console.log($scope.actions[username]);
        Api.Action.get({ id: username }, function(data){
            console.log("Data", data);
            $scope.actions = data.data;
        });
    };
    
    $scope.deleteAll = function(){
        Api.Action.delete({}, function(data){
            $scope.actions = [];
        });
    };
    
    $scope.delete = function(index){
        bootbox.confirm("Are you sure you want to delete this action?", function(answer){
            if(answer == true){
                console.log($scope.actions[index]._id);
                Api.Action.delete({id: $scope.actions[index]._id}, function(data){
                    $scope.actions.splice(index, 1);
                });
            }
        });
    };
    
    $scope.addToDatabase = function(){
        if($scope.username != null || $scope.username != undefined){
            $scope.form['username'] = $scope.username;
            let vid = $scope.form.id || null;
            if(vid == null){
                Api.Action.save({}, $scope.form, 
                function(data){
                    console.log(data);
                    console.log($scope.form);
                    $scope.actions.push(data.data);
                    $scope.form = {};
                },
                function(err){
                    bootbox.alert('Error: ' + err);
                });   
            }else{
                 Api.Action.save({id: vid}, $scope.form, 
                function(data){
                    // delete $scope.actions;
                    console.log($scope.actions);
                    console.log($scope.actions);
                     for(var i=0; i<$scope.actions.length; i++){
                        if($scope.actions[i]._id == vid){
                            $scope.actions.splice(i, 1);
                            // delete $scope.actions[i];
                            break;
                        }
                    }
                    $scope.actions.push(data.data);
                    $scope.form = {};
                },
                function(err){
                    bootbox.alert('Error: ' + err);
                });      
            }
        }else{
            bootbox.alert("Please Login..");
        }
    };
    
    $scope.FBLoginStatus = function () {
        console.log("LVUUUSM");
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            // the user is logged in and has authenticated your
            // app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed
            // request, and the time the access token 
            // and signed request each expire
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            $scope.username = response.authResponse.userID;
            console.log($scope.username);
            $scope.getActions($scope.username);
            $(".logout-btn").show();
            $(".login-btn").hide();
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            $(".logout-btn").hide();
            $(".login-btn").show();
            $scope.actions = [];
            $scope.form = {};
            console.log("User are not authenticated");
          } else {
            // the user isn't logged in to Facebook.
            $(".logout-btn").hide();
            $(".login-btn").show();
            $scope.actions = [];
            console.log("User are not authenticated");
          }
         });
    };
    
    $scope.FBLogout = function(){
      FB.logout(function(response) {
          // user is now logged out
          $scope.username = "";
          delete $scope.username;
          $scope.actions = [];
          $(".logout-btn").hide();
          $(".login-btn").show();
          $scope.form = {};
          $scope = "";
          console.log("user is now logged out");
      });  
    };
    
    $scope.FBLogin = function(){
        FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
               
               var accessToken = FB.getAuthResponse();
               console.log(accessToken);
               if(accessToken.userID != null){
                   $scope.username = accessToken.userID;
                   console.log($scope.username);
                   $("#sm").removeClass('ng-hide');
                   $scope.getActions(accessToken.userID);
                   $(".logout-btn").show();
                   $(".login-btn").hide();
               }
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    };
    
}]);