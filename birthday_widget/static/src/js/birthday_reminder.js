/** @odoo-module **/
import AbstractField from 'web.AbstractField';
import fieldRegistry from 'web.field_registry';
var core = require('web.core');
var _t = core._t;
var _lt = core._lt;
var session = require('web.session');
const birthdayinfo = AbstractField.extend({
    description: _lt("Birthday Info"),
    supportedFieldTypes: ['date', 'datetime'],

    /**
     * @override
     */
    init() {
        this._super(...arguments);
        this.formatOptions.timezone = true;
    },   
    _renderReadonly() {
        if (this.value === false) {
            this.$el.removeClass('font-weight-bold text-danger text-warning');
            return;
        }
        // compare the value (in the user timezone) with now (also in the user
        // timezone), to get a meaningful delta for the user
        const nowtimeUTC = moment().utc();
        const nowUsertimeTZ = nowtimeUTC.clone().add(session.getTZOffset(nowtimeUTC), 'minutes');
        var fieldDataValue = this.field.type == "datetime" ? this.value.clone().add(session.getTZOffset(this.value), 'minutes') : this.value;
        fieldDataValue = fieldDataValue.year(nowUsertimeTZ.year());
        const diffDays = fieldDataValue.startOf('day').diff(nowUsertimeTZ.startOf('day'), 'days');
        
        let text;
        if (diffDays === 1) {
            text = _t(" Bday Tomorrow ");
        } else if (diffDays === 0) {
            text = _t(" Bday Today ");
        } else if (diffDays > 0 && diffDays <= 30) {
            text = _.str.sprintf(_t('Bday in %s days'), diffDays);
        } else if (diffDays > 0 && diffDays > 30) {
            const diffMonths = fieldDataValue.startOf('day').diff(nowUsertimeTZ.startOf('day'), 'months');
            text = _.str.sprintf(_t('Bday in %s months'), diffMonths);
        }
        this.$el.text(text).attr('title', this._formatValue(this.value, 'date'));
        this.$el.toggleClass('text-primary font-weight-bold', diffDays > 0 && diffDays > 30);
        this.$el.toggleClass('text-warning font-weight-bold', diffDays > 0 && diffDays <= 30);
        this.$el.toggleClass('text-success fa fa-1x fa-gift font-weight-bold', diffDays === 0);
        this.$el.toggleClass('text-danger font-weight-bold', diffDays === 1);
    },
});
fieldRegistry.add('birthdayinfo', birthdayinfo);
