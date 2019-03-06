# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_14_124856) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "bookings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "booking_status"
    t.string "payment_status"
    t.decimal "final_price"
    t.datetime "booking_date"
    t.integer "quantity"
    t.text "passengers", default: [], array: true
    t.string "booking_email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "full_price"
    t.uuid "coupon_id"
    t.index ["coupon_id"], name: "index_bookings_on_coupon_id"
  end

  create_table "coupons", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.float "amount", default: 0.0
    t.integer "limit", default: 0
    t.date "expiration"
    t.string "code"
    t.boolean "percentage", default: false
    t.integer "used", default: 0
  end

  create_table "date_ranges", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "operator_id"
    t.date "from"
    t.date "to"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["operator_id"], name: "index_date_ranges_on_operator_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "operators", force: :cascade do |t|
    t.string "name"
    t.string "logo"
    t.string "website"
    t.string "contact_email"
    t.string "contact_phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tickets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "booking_id"
    t.bigint "trip_id"
    t.datetime "date"
    t.string "pickup_name"
    t.string "pickup_address"
    t.string "pickup_phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["booking_id"], name: "index_tickets_on_booking_id"
    t.index ["trip_id"], name: "index_tickets_on_trip_id"
  end

  create_table "trips", force: :cascade do |t|
    t.string "name"
    t.bigint "from_id"
    t.bigint "to_id"
    t.bigint "operator_id"
    t.string "status"
    t.decimal "price"
    t.string "currency"
    t.string "departure_time"
    t.string "arrival_time"
    t.integer "duration"
    t.bigint "vehicle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "high_season"
    t.index ["from_id"], name: "index_trips_on_from_id"
    t.index ["operator_id"], name: "index_trips_on_operator_id"
    t.index ["to_id"], name: "index_trips_on_to_id"
    t.index ["vehicle_id"], name: "index_trips_on_vehicle_id"
  end

  create_table "unavailables", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.bigint "trip_id"
    t.date "date"
    t.index ["trip_id"], name: "index_unavailables_on_trip_id"
  end

  create_table "vehicles", force: :cascade do |t|
    t.string "kind"
    t.string "subtype"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bookings", "coupons"
  add_foreign_key "tickets", "bookings"
end
