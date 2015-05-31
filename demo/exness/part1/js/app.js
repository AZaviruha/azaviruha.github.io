var app = angular.module( 'ExnessPart1', []);

var URLS = {
    details: './mocks/data.json'
};


/* ===================================================== */
/* ==================== Controllers ==================== */
/* ===================================================== */

/**
 * Root application controller.
 */
var AppController = function ( $scope, $http ) {
    var EUR = 'EUR';

    $scope.model = {
        currencies1: [
            { id: 'EUR', text: 'EUR' }, 
            { id: 'USD', text: 'USD' }, 
            { id: 'ALL', text: 'All' }
        ],
        
        currencies2: [
            { id: 'USD', text: 'USD' }, 
            { id: 'GBP', text: 'GBP' }
        ]
    };
    
    $scope.model.selectedCurr1 = null;
    $scope.model.selectedCurr2 = null;
    $scope.model.details       = null;
    
    
    $scope.isCurrencies2Visible = function () {
        var selectedCurr1 = $scope.model.selectedCurr1;
        return !!(selectedCurr1 && selectedCurr1.id === EUR);
    };
    

    $scope.isDetailsVisible = function () {
        return !!$scope.model.details;
    };
    

    $scope.hideDetails = function () {
        $scope.model.selectedCurr2 = null;
        $scope.model.details       = null;
    };
    

    /**
     * << Async >>
     * Updates `details` form by AJAX.
     */
    $scope.fillDetails = function () {
        return $http.get( URLS.details ).then(function ( resp ) {
            var data     = (resp.data && resp.data.base) || []
              , model    = $scope.model
              , curr1    = model.selectedCurr1.id
              , curr2    = model.selectedCurr2.id
              , name     = [ curr1, curr2 ].join( '/' )
              , filtered = data.filter(function ( x ) {
                    return x.name === name;
                })
              , details  = !!filtered.length ? filtered[ 0 ] : null;

            model.details = details;
        });
    };
};

AppController.$inject = [ '$scope', '$http' ];
app.controller( 'AppController', AppController );



/* ===================================================== */
/* ==================== Directives ===================== */
/* ===================================================== */

var CustomSelect = function ( $parse, $document ) {
    return {
        restrict: 'E',
        replace:  true,
        require:  'ngModel',

        templateUrl: '/tpl.html',

        scope: { items: '=' },

        link:  function ( scope, el, attrs, ngModel ) {

            /**
             * Updates `scope.current` when ngModel's value
             * changed in parent scope.
             */
            scope.$watch(
                function () { return ngModel.$modelValue; }, 
                function( newVal ) { scope.current = newVal; });
            

            /**
             * Adds `ng-change` handler to the list
             * of `ng-model` observers.
             * This allows to update ngModel's value in
             * parent scope.
             */
            ngModel.$viewChangeListeners.push(function () {
                scope.$eval( attrs.ngChange );
                scope.current = ngModel.$modelValue;
            });
            

            /* =============== Selection ============== */

            scope.isSelected = function ( el ) {
                return el === scope.current;
            };
            

            scope.selectItem = function ( el ) {
                scope.current = el;
                ngModel.$setViewValue( el );
                scope.close();
            };
            

            /* =============== Expand\Collapse ============== */

            scope.__isOpened = false;


            scope.open = function () {
                scope.__isOpened = true;
            };


            scope.toggle = function () {
                scope.__isOpened = !scope.__isOpened;
            };


            scope.close = function () {
                scope.__isOpened = false;
            };


            scope.isOpened = function () {
                return scope.__isOpened;
            };


            /**
             * Provides collapsing of <custom-select>
             * when User clicks on other elements.
             */

            $document.on( 'click', docClickHandler );

            scope.$on( '$destroy', function () {
                $document.off( 'click', docClickHandler );
            });

            function docClickHandler ( e ) {
                var ch = el.children();
                for ( var i = 0, len = ch.length; i < len; i++ ) {
                    if ( e.target == ch[ i ] ) {
                        e.stopPropagation();
                        return;
                    }
                } 

                scope.$apply(function () { scope.close(); });
            };
        }
    };
};

CustomSelect.$inject = [ '$parse', '$document' ];
app.directive( 'customSelect', CustomSelect );



/**
 * Angular initialization
 */
angular.element( document ).ready(function () {
    angular.bootstrap( document, [ 'ExnessPart1' ] );
});

