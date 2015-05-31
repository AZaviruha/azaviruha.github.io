var app = angular.module( 'ExnessPart2', []);


/* ===================================================== */
/* ==================== Controllers ==================== */
/* ===================================================== */

/**
 * Root application controller.
 */
var AppController = function ( $scope, $http ) {
    $scope.model = {
        currentDate: new Date()
        // currentDate: null
    };
    

    $scope.logDate = function () {
        console.log( 'logDate :: ', $scope.model.currentDate );
    };
};

AppController.$inject = [ '$scope', '$http' ];
app.controller( 'AppController', AppController );



/* ===================================================== */
/* ==================== Directives ===================== */
/* ===================================================== */

/**
 * CustomDatepicker directive.
 *
 * Supports all date formats, 
 * that are supported by moment.js
 */
var CustomDatepicker = function ( $parse, $document ) {
    var END_OF_WEEK = 6;

    return {
        restrict: 'E',
        replace: true,
        require: 'ngModel',

        templateUrl: '/tpl.html',

        scope: { items: '=' },

        link: function ( scope, el, attrs, ngModel ) {

            /**
             * Updates `scope.current` when ngModel's value
             * changed in parent scope.
             */
            scope.$watch(
                function () { return ngModel.$modelValue; }, 
                function( newVal ) { scope.current = newVal; });
            
            // Current date presentation
            scope.current   = ngModel.$modelValue || new Date();

            // "Real" current date
            scope.__current = scope.current;

            scope.format    = attrs.format;
            scope.formated  = getFormatedDate( scope.current );
            
            scope.year  = getCurrentYear;
            scope.month = getCurrentMonth;
            scope.day   = null;
            scope.daysOfWeek = [ 
                'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'
            ];
            
            scope.dayGroups = getDayGroups();
            

            /**
             * Adds `ng-change` handler to the list
             * of `ng-model` observers.
             * This allows to update ngModel's value in
             * parent scope.
             */
            ngModel.$viewChangeListeners.push(function () {
                scope.$eval( attrs.ngChange );
                scope.current   = ngModel.$modelValue;
                scope.__current = ngModel.$modelValue;
            });
            

            /* =============== Months ============== */

            scope.getPrevMonth = function ( e ) {
                e.stopPropagation();
                scope.current = moment( scope.current )
                    .subtract( 1, 'month' )
                    .toDate();
                scope.dayGroups = getDayGroups();
            };


            scope.getNextMonth = function ( e ) {
                e.stopPropagation();
                scope.current = moment( scope.current )
                    .add( 1, 'month' )
                    .toDate();
                scope.dayGroups = getDayGroups();
            };
            

            function getFormatedDate () {
                return moment( scope.current ).format( scope.format );
            };
            
            function getCurrentYear () {
                return moment( scope.current ).year();
            }

            function getCurrentMonth () {
                return moment( scope.current ).format( 'MMMM' );
            }
            
            
            function getDaysRange ( month, year ) {
                var date   = new Date( year, month, 1 )
                  , result = [];

                while ( date.getMonth() == month ) {
                    result.push({ 
                        text:      date.getDate(),
                        isCurrent: true,
                        date:      new Date( date )
                    });
                    date.setDate( date.getDate() + 1 );
                }

                return result;
            }
            
            function getCurrentDaysRange () {
                return getDaysRange(
                    scope.current.getMonth(),
                    scope.year()
                );
            }

            /**
             * Gets range of days from previous month
             * to fill first week.
             */
            function getPrevDaysRange () {
                var currDate = moment( scope.current )
                  , currMonth = currDate.month()
                  , prevMonth = moment( scope.current )
                        .subtract( 1, 'months' ).month()
                  , firstDay  = new Date( scope.year(), currMonth, 1 )
                  , dayOfWeek = firstDay.getDay()
                  , result    = [];
                
                // First day of current month is already sunday.
                if ( dayOfWeek === 0 ) dayOfWeek = END_OF_WEEK + 1;

                var newDate;
                for ( var i = dayOfWeek; i > 0 ; i-- ) {
                    newDate = moment( firstDay ).subtract( i, 'd' );
                    result.push({
                        text:      newDate.date(),
                        isCurrent: false,
                        date:      newDate.toDate()
                    });
                }

                return result;
            }
            
            /**
             * Gets range of days from next month
             * to fill last week.
             */
            function getNextDaysRange () {
                var currDate  = moment( scope.current )
                  , currMonth = currDate.month()
                  , nextMonth = moment( scope.current )
                        .add( 1, 'months' ).month()
                  , days      = currDate.daysInMonth()
                  , lastDay   = new Date( scope.year(), currMonth, days )
                  , dayOfWeek = lastDay.getDay()
                  , result    = [];
                
                // Last day of current month is already saturday.
                if ( dayOfWeek === END_OF_WEEK ) dayOfWeek = -1;

                var newDate;
                for ( var i = 1; i <= END_OF_WEEK - dayOfWeek; i++ ) {
                    newDate = moment( lastDay ).add( i, 'd' );
                    result.push({
                        text:      newDate.date(),
                        isCurrent: false,
                        date:      newDate.toDate()
                    });
                }

                return result;
            }
            
            function getDayGroups () {
                var days = getPrevDaysRange()
                    .concat( getCurrentDaysRange() )
                    .concat( getNextDaysRange() );
                
                var grouped = [];
                
                days.forEach(function ( d, i ) {
                    var groupIdx = Math.floor( i / 7 );
                    grouped[ groupIdx ] = grouped[ groupIdx ] || [];
                    grouped[ groupIdx ].push( d );
                });
                
                return grouped;
            }
            


            /* =============== Selection ============== */

            scope.isSelected = function ( other ) {
                var curr = scope.__current;
                return ( curr.getDate() === other.getDate() )
                       && ( curr.getMonth() === other.getMonth() )
                       && ( curr.getYear() === other.getYear() );
            };
            
            
            /**
             * Synchronize current date presentation
             * and "real" current date.
             */
            function refreshCurrent () {
                scope.current   = scope.__current;
                scope.dayGroups = getDayGroups();
                scope.formated  = getFormatedDate( scope.current );
                ngModel.$setViewValue( scope.current );
            }


            scope.selectDay = function ( date, e ) {
                e.stopPropagation();
                if ( !scope.__previous ) 
                    scope.__previous = scope.__current;
                scope.current  = date;
                scope.__current = scope.current;
                scope.formated  = getFormatedDate( scope.current );
                // scope.close();
            };
            
            
            /* =============== Expand\Collapse ============== */

            var __isOpened = false;

            scope.isOpened = function () {
                return __isOpened;
            };


            scope.open = function () {
                __isOpened = true;
                refreshCurrent();
            };


            scope.toggle = function () {
                __isOpened = !__isOpened;
                refreshCurrent();
            };


            scope.close = function ( e ) {
                if ( e ) { 
                    e.stopPropagation();
                    scope.__previous = null;
                }
                __isOpened      = false;
            };


            /**
             * Provides collapsing of <custom-datepicker>
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

                scope.$apply(function () { 
                    /**
                     * If datepicker is closed not by
                     * "OK" button, then restore previous 
                     * value of current date.
                     */
                    if ( scope.__previous ) {
                        scope.__current = scope.__previous;
                        scope.__previous = null;
                        refreshCurrent();
                    }
                    scope.close(); 
                });
            };

        }
    };
};

CustomDatepicker.$inject = [ '$parse', '$document' ];
app.directive( 'customDatepicker', CustomDatepicker );



/**
 * Angular initialization
 */
angular.element( document ).ready(function () {
    angular.bootstrap( document, [ 'ExnessPart2' ] );
});

